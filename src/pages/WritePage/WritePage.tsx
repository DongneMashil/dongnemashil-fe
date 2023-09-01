import React, {
  // ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NavBar } from 'components/layout';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  ReviewForm,
  TagContainer,
  useMediaFiles,
  useSubmitHandler,
  useWritePageState,
} from 'components/writePage';
import { MediaFileType, mediaFilesAtom } from 'recoil/mediaFile/mediaFileAtom';
// import imageCompression from 'browser-image-compression';  // 크롭모달에 내장되어있음
import { Modal } from 'components/common';
import { StLayout, StLayoutContainer } from './WritePagestyles';
import { LoadingPage } from 'pages/LoadingPage/LoadingPage';
import { CropModal } from 'components/common/CropModal/CropModal';
import { useRecoilValue } from 'recoil';

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

// const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
// const ALLOWED_VIDEO_TYPES = ['video/mov', 'video/mp4'];  // 크롭모달에 내장되어있음

const useStableNavigate = () => {
  const navigateRef = useContext(StableNavigateContext);
  if (!navigateRef || !navigateRef.current) {
    throw new Error('StableNavigate context is not initialized');
  }
  return navigateRef.current;
};

export const WritePage = () => {
  const navigate = useStableNavigate();
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const recoilMediaFiles = useRecoilValue(mediaFilesAtom);
  const [currentPage, setCurrentPage] = useState(0);
  // const fileInputRef = useRef<HTMLInputElement>(null);  필요없어짐
  const {
    reviewId,
    reviewData,
    formValues: hookFormValues,
    selectedTags,
    setSelectedTags,
    addressData,
    onInputChange,
  } = useWritePageState();

  const { mediaFiles, setMediaFiles } = useMediaFiles(reviewData); //수정없음

  // const onFileChange = useCallback(  크롭모달에 내장되어있음. 해당 파일이 아니면 선택이 안됨.
  //   async (e: ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(e.target.files || []);

  //     const validFiles = files.filter((file) => {
  //       if (
  //         !ALLOWED_IMAGE_TYPES.includes(file.type) &&
  //         !ALLOWED_VIDEO_TYPES.includes(file.type)
  //       ) {
  //         setModalMessage(
  //           '이미지는 PNG, JPG, JPEG | 동영상은 MOV, MP4만 업로드 가능합니다.'
  //         );
  //         setIsModalOpen(true);
  //         return false;
  //       }
  //       if (file.size > 100 * 1024 * 1024) {
  //         setModalMessage(
  //           `${file.name} 파일은 100MB를 초과하므로 업로드할 수 없습니다.`
  //         );
  //         setIsModalOpen(true);
  //         return false;
  //       }
  //       return true;
  //     });

  //     if (mediaFiles.length + validFiles.length > 5) {
  //       setModalMessage('이미지와 동영상의 합은 최대 5개까지 가능합니다.');
  //       setIsModalOpen(true);
  //       return;
  //     }

  //     if (
  //       mediaFiles.filter((file) => file.type === 'video').length +
  //         validFiles.filter((file) => file.type.startsWith('video/')).length >
  //       1
  //     ) {
  //       setModalMessage('동영상은 한개만 가능합니다.');
  //       setIsModalOpen(true);
  //       return;
  //     }

  //     for (const file of validFiles) {
  //       const fileType: 'image' | 'video' = file.type.startsWith('image/')
  //         ? 'image'
  //         : 'video';

  //       if (fileType === 'image') {
  //         const options = {
  //           maxSizeMB: 1,
  //           maxWidthOrHeight: 1440,
  //           useWebWorker: true,
  //         };

  //         try {
  //           const compressedFileBlob = await imageCompression(file, options);
  //           const compressedFile = new File([compressedFileBlob], file.name, {
  //             type: file.type,
  //             lastModified: file.lastModified,
  //           });

  //           setMediaFiles((prev) => {
  //             const updatedFiles = [
  //               ...prev,
  //               { type: fileType, file: compressedFile, isCover: false },
  //             ];

  //             if (!prev.some((p) => p.isCover) || (prev[0].type === 'video' && prev.length === 1)) {
  //             const index = updatedFiles.length - 1;
  //             updatedFiles[index].isCover = true;
  //           }

  //             return updatedFiles;
  //           });
  //         } catch (error) {
  //           console.error('Error compressing the image:', error);
  //         }
  //       } else {
  //         setMediaFiles((prev) => {
  //           const updatedFiles = [
  //             ...prev,
  //             { type: fileType, file, isCover: false },
  //           ];

  //           if (!prev.some((p) => p.isCover)) {
  //             const index = updatedFiles.length - 1;
  //             updatedFiles[index].isCover = true;
  //           }

  //           return updatedFiles;
  //         });
  //       }
  //     }
  //   },
  //   [mediaFiles]
  // );
  useEffect(() => {
    //이 부분 추가되었습니다. recoilMediaFiles가 바뀔 때마다 mediaFiles를 업데이트합니다.
    if (recoilMediaFiles.length > 0) {
      setMediaFiles(recoilMediaFiles);
    }
  }, [recoilMediaFiles]);

  const setCoverImage = (targetFile: MediaFileType) => {
    setMediaFiles((prev) =>
      prev.map((file) =>
        file.file === targetFile
          ? { ...file, isCover: true }
          : { ...file, isCover: false }
      )
    );
  };

  const onDeleteImage = (targetFile: MediaFileType) => {
    setMediaFiles((prev) => prev.filter((file) => file.file !== targetFile));
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const onButtonClick = () => {
    // fileInputRef.current?.click();  // 필요없어짐
    if (mediaFiles.length >= 5) {
      //이 부분 추가되었습니다. 갯수 체크 부분입니다.
      setModalMessage('이미지와 동영상의 합은 최대 5개까지 가능합니다.');
      setIsModalOpen(true);
      return;
    }
    setIsCropModalOpen(true);
  };

  const { handleSubmit, isLoading } = useSubmitHandler({
    reviewId,
    formValues: hookFormValues,
    mediaFiles: mediaFiles,
    selectedTags,
    addressData,
    setIsModalOpen,
    setModalMessage,
  });

  const determineIsCoverImage = useCallback(
    //수정없음
    (targetFile: MediaFileType) => {
      const file = mediaFiles.find((file) => file.file === targetFile);
      return file ? file.isCover : false;
    },
    [mediaFiles]
  );

  const onGoToWriteMapPageHandler = () => {
    if (reviewId) {
      navigate('/writemap', { state: { reviewId: reviewId } });
    } else {
      navigate('/writemap');
    }
  };

  const onCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <StLayout>
      {isLoading && <LoadingPage />}
      <NavBar
        btnLeft={'back'}
        btnRight={'submit'}
        onClickSubmit={handleSubmit}
        $isWritePage={true}
      >
        {addressData.roadName}
      </NavBar>
      <StLayoutContainer>
        <TagContainer
          selectedTags={selectedTags}
          handleTagChange={handleTagChange}
          addressData={addressData}
          onGoToWriteMapPageHandler={onGoToWriteMapPageHandler}
        />
        <ReviewForm
          formValues={hookFormValues}
          onInputChange={onInputChange}
          mediaFiles={mediaFiles}
          // onFileChange={onFileChange}  필요없어짐
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onAddImage={onButtonClick}
          setCoverImage={setCoverImage}
          onDeleteImage={onDeleteImage}
          determineIsCoverImage={determineIsCoverImage}
          // fileInputRef={fileInputRef}  필요없어짐
        />
        <Modal
          isOpen={isModalOpen}
          onCloseHandler={onCloseHandler}
          title="알림"
          firstLine={modalMessage}
        />
        <CropModal //추가되었습니다.
          isOpen={isCropModalOpen}
          onCloseHandler={() => setIsCropModalOpen(false)}
          fixedAspectRatio={false}
          isWriteReview={true}
          isVideoSubmitted={recoilMediaFiles.some(
            (file) => file.type === 'video'
          )}
        />
      </StLayoutContainer>
    </StLayout>
  );
};
