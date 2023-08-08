import React, { useState } from 'react';
import { Input, Button } from 'components/common';

const Searchpage = () => {
  const [value, setValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <h3>구를 입력해주세요!</h3>
      <Input
        type="text"
        name="searchQuery"
        id="searchQuery"
        value={value}
        onChange={onChangeHandler}
        placeholder="예) 강남구"
      />
      <Button></Button>
    </div>
  );
};

export default Searchpage;
