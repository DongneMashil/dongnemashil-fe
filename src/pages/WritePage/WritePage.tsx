import React, { ChangeEvent, useRef, useState } from 'react';
import {
  StContentBox,
  StContentContainer,
  StHiddenButton,
  StTitle,
} from './WritePage.styles';
import { CommonLayout, NavBar } from 'components/layout';
import { FileSlider } from 'components/WritePage';
import { useMutation } from '@tanstack/react-query';
import { submitReview } from 'api/reviews';
import { useNavigate } from 'react-router-dom';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';
// import { useVerifyUser } from 'hooks';
// import { useRecoilValue } from 'recoil';
// import { userIsLoggedInSelector } from 'recoil/userExample';

interface FormValues {
  title: string;
  content: string;
}

export const WritePage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    content: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<
    { type: 'image' | 'video'; file: File; isCover: boolean }[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [shouldVerify, setShouldVerify] = useState(false);
  // const { data } = useVerifyUser(shouldVerify);
  // const isLoggedIn = useRecoilValue(userIsLoggedInSelector);

  // useEffect(() => {
  //   setShouldVerify(true);
  //   if (!isLoggedIn) {
  //     alert('로그인이 만료되었습니다. 다시 로그인해주세요');
  //     navigate('/login');
  //   }
  // }, [data, navigate]);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormValues;
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) => {
      if (file.size > 100 * 1024 * 1024) {
        alert(`${file.name} 파일은 100MB를 초과하므로 업로드할 수 없습니다.😱`);
        return false;
      }
      return true;
    });

    if (mediaFiles.length + validFiles.length > 5) {
      alert('이미지와 동영상의 합은 최대 5개까지 가능합니다.😱');
      return;
    }

    if (
      mediaFiles.filter((file) => file.type === 'video').length +
        validFiles.filter((file) => file.type.startsWith('video/')).length >
      1
    ) {
      alert('동영상은 한개만 가능합니다.😱');
      return;
    }

    validFiles.forEach((file) => {
      const fileType: 'image' | 'video' = file.type.startsWith('image/')
        ? 'image'
        : 'video';
      setMediaFiles((prev) => {
        const updatedFiles = [
          ...prev,
          { type: fileType, file, isCover: false },
        ];

        if (fileType === 'image' && !prev.some((p) => p.isCover)) {
          const index = updatedFiles.length - 1;
          updatedFiles[index].isCover = true;
        }

        return updatedFiles;
      });
    });
  };

  const setCoverImage = (targetFile: File) => {
    setMediaFiles((prev) =>
      prev.map((file) =>
        file.file === targetFile
          ? { ...file, isCover: true }
          : { ...file, isCover: false }
      )
    );
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const mutation = useMutation(submitReview);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmithandler = async () => {
    if (mediaFiles.length === 0) {
      alert('최소 하나의 이미지를 선택해야 합니다.');
      return;
    }
    if (!mediaFiles.some((file) => file.type === 'image')) {
      alert('최소 하나의 이미지를 추가해야 합니다.');
      return;
    }

    const formData = new FormData();
    const jsonData = {
      title: formValues.title,
      content: formValues.content,
      address: '서울시 영등포구 여의동로 330',
      tag: selectedTags,
    };
    
    const blob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const coverImage = mediaFiles.find(
      (file) => file.isCover && file.type === 'image'
    );
    if (coverImage) {
      formData.append('mainImgUrl', coverImage.file);
    }

    mediaFiles.forEach((file) => {
      if (file.type === 'image' && !file.isCover) {
        formData.append('subImgUrl', file.file);
      } else if (file.type === 'video') {
        formData.append('videoUrl', file.file);
      }
    });

    mutation.mutate(formData, {
      onSuccess: (response) => {
        console.log('등록성공', response);
        navigate(`/review/${response.id}`);
      },
      onError: (error: unknown) => {
        if (typeof error === 'string') {
          console.log('실패', error);
        } else if (error instanceof Error) {
          console.log('실패', error.message);
        } else {
          console.log('실패', error);
        }
      },
    });
  };

  const determineIsCoverImage = (targetFile: File) => {
    const file = mediaFiles.find((file) => file.file === targetFile);
    return file ? file.isCover : false;
  };

  return (
    <>
      <CommonLayout
        header={
          <NavBar
            btnLeft={'back'}
            btnRight={'submit'}
            onClickSubmit={onSubmithandler}
          >
            주소값
          </NavBar>
        }
      >
        <StContentContainer>
          <StTitle
            type="text"
            name="title"
            value={formValues.title}
            onChange={onInputChange}
            placeholder="제목 입력"
          />
          <ToggleTagButton onTagChange={handleTagChange} />

          <FileSlider
            files={mediaFiles}
            images={mediaFiles.map((file) => file.file)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onAddImage={onButtonClick}
            onSelectedCoverImage={setCoverImage}
            isCoverImage={determineIsCoverImage}
            setCoverImage={setCoverImage}
          />
          <StHiddenButton
            ref={fileInputRef}
            type="file"
            accept="image/*, video/*"
            multiple
            onChange={onFileChange}
          />

          <StContentBox
            name="content"
            value={formValues.content}
            onChange={onInputChange}
            placeholder="산책은 어땠나요?"
          />
        </StContentContainer>
      </CommonLayout>
    </>
  );
};
