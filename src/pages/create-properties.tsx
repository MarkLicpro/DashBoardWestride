import React, { useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import Form from '../components/Common/Form';
import { FieldValues } from 'react-hook-form';

function CreateProperties() {
  // 1. ดึงข้อมูล User (เอาวงเล็บปีกกาที่ว่างอยู่ออกให้เรียบร้อย)
  const { data: user } = useGetIdentity<any>(); 
  
  // 2. จัดการ State รูปภาพ
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' });

  // 3. ดึงค่าต่างๆ จาก useForm ของ Refine
  const { 
    refineCore: { onFinish, formLoading }, 
    register, 
    handleSubmit 
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>{
      return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsDataURL(readFile);
      });
    };
    reader(file).then((result: string) => {
      setPropertyImage({ name: file.name, url: result });
    });
  };


  // 4. สร้างฟังก์ชันสำหรับจัดการข้อมูลก่อนกด Submit
  const onFinishHandler = async (data: FieldValues) => {
    // เช็คว่าผู้ใช้เลือกรูปภาพหรือยัง
    if (!propertyImage.name) return alert('Please select an image');
    
    // ส่งข้อมูลทั้งหมดเข้า Database
    await onFinish({ 
        ...data, 
        photos: propertyImage.url, 
        email: user?.email 
    });
  };

  // 5. ส่ง Props เข้าไปใน Form ให้ครบถ้วน
  return (
    <Form 
      type="Create"
      register={register}

      formLoading={formLoading} // 
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler} 
      propertyImage={propertyImage} 
    />
  );
}

export default CreateProperties;