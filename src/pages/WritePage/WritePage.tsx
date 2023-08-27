import React, {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
// import { StContentContainer } from './WritePage.styles';
import { NavBar } from 'components/layout';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  ReviewForm,
  TagContainer,
  useSubmitHandler,
  useWritePageState,
} from 'components/writePage';
import { MediaFileType } from 'recoil/mediaFile/mediaFileAtom';
import imageCompression from 'browser-image-compression';

interface StableNavigateContextProviderProps {
  children: React.ReactNode;
}

const StableNavigateContext =
  createContext<React.MutableRefObject<NavigateFunction | null> | null>(null);

export const StableNavigateContextProvider: React.FC<
  StableNavigateContextProviderProps
> = ({ children }) => {
  const navigateRef = useRef(useNavigate());
  return (
    <StableNavigateContext.Provider value={navigateRef}>
      {children}
    </StableNavigateContext.Provider>
  );
};

const useStableNavigate = () => {
  const navigateRef = useContext(StableNavigateContext);
  if (!navigateRef || !navigateRef.current) {
    throw new Error('StableNavigate context is not initialized');
  }
  return navigateRef.current;
};

export const WritePage = () => {
  const navigate = useStableNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    reviewId,
    formValues: hookFormValues,
    selectedTags,
    setSelectedTags,
    addressData,
    mediaFiles: hookMediaFiles,
    setMediaFiles: hooksSetMediaFiles,
    onInputChange,
  } = useWritePageState();

  const onFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      const validFiles = files.filter((file) => {
        if (file.size > 100 * 1024 * 1024) {
          alert(`${file.name} 파일은 100MB를 초과하므로 업로드할 수 없습니다.`);
          return false;
        }
        return true;
      });

      if (hookMediaFiles.length + validFiles.length > 5) {
        alert('이미지와 동영상의 합은 최대 5개까지 가능합니다.');
        return;
      }

      if (
        hookMediaFiles.filter((file) => file.type === 'video').length +
          validFiles.filter((file) => file.type.startsWith('video/')).length >
        1
      ) {
        alert('동영상은 한개만 가능합니다.');
        return;
      }

      for (const file of validFiles) {
        const fileType: 'image' | 'video' = file.type.startsWith('image/')
          ? 'image'
          : 'video';

        if (fileType === 'image') {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1440,
            useWebWorker: true,
          };

          try {
            const compressedFileBlob = await imageCompression(file, options);
            const compressedFile = new File([compressedFileBlob], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            });

            hooksSetMediaFiles((prev) => {
              const updatedFiles = [
                ...prev,
                { type: fileType, file: compressedFile, isCover: false },
              ];

              if (!prev.some((p) => p.isCover)) {
                const index = updatedFiles.length - 1;
                updatedFiles[index].isCover = true;
              }

              return updatedFiles;
            });
          } catch (error) {
            console.error('Error compressing the image:', error);
          }
        } else {
          hooksSetMediaFiles((prev) => {
            const updatedFiles = [
              ...prev,
              { type: fileType, file, isCover: false },
            ];

            if (!prev.some((p) => p.isCover)) {
              const index = updatedFiles.length - 1;
              updatedFiles[index].isCover = true;
            }

            return updatedFiles;
          });
        }
      }
    },
    [hookMediaFiles]
  );

  const setCoverImage = (targetFile: MediaFileType) => {
    hooksSetMediaFiles((prev) =>
      prev.map((file) =>
        file.file === targetFile
          ? { ...file, isCover: true }
          : { ...file, isCover: false }
      )
    );
  };

  const onDeleteImage = (targetFile: MediaFileType) => {
    hooksSetMediaFiles((prev) =>
      prev.filter((file) => file.file !== targetFile)
    );
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { handleSubmit } = useSubmitHandler({
    reviewId,
    formValues: hookFormValues,
    mediaFiles: hookMediaFiles,
    selectedTags,
    addressData,
  });

  const determineIsCoverImage = (targetFile: MediaFileType) => {
    const file = hookMediaFiles.find((file) => file.file === targetFile);
    return file ? file.isCover : false;
  };

  const onGoToWriteMapPageHandler = () => {
    if (reviewId) {
      navigate('/writemap', { state: { reviewId: reviewId } });
    } else {
      navigate('/writemap');
    }
  };

  return (
    <>
      <NavBar
        btnLeft={'back'}
        btnRight={'submit'}
        onClickSubmit={handleSubmit}
        $isWritePage={true}
      >
        {addressData.roadName}
      </NavBar>
      {/* <StContentContainer> */}
        <TagContainer
          selectedTags={selectedTags}
          handleTagChange={handleTagChange}
          addressData={addressData}
          onGoToWriteMapPageHandler={onGoToWriteMapPageHandler}
        />
        <ReviewForm
          formValues={hookFormValues}
          onInputChange={onInputChange}
          mediaFiles={hookMediaFiles}
          onFileChange={onFileChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onAddImage={onButtonClick}
          setCoverImage={setCoverImage}
          onDeleteImage={onDeleteImage}
          determineIsCoverImage={determineIsCoverImage}
          fileInputRef={fileInputRef}
        />
      {/* </StContentContainer> */}
    </>
  );
};
