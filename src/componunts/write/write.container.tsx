import { useAuth } from "../../commons/hooks/useAuth";
import MarketWriteUI from "./write.presenter";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USED_ITEM, FETCH_USED_ITEM, UPDATE_USED_ITEM } from "./write.queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "antd";
import "antd/dist/antd.css";

const ReactQuill = dynamic(() => import("react-quill"), {ssr : false});

export default function MarketWrite(props){

    useAuth()
    const router = useRouter() 

    const [createUseditem] = useMutation(CREATE_USED_ITEM)
    const [updateUseditem] = useMutation(UPDATE_USED_ITEM);
    const { data } = useQuery(FETCH_USED_ITEM,{
    variables:{ useditemId: router.query.useditemId}
  });
  
    const { register, handleSubmit, formState, setValue, trigger, reset, getValues } = useForm({
            mode:"onChange",   
    });

    const [fileUrls, setFileUrls] = useState(["", "", ""]);

    const [ address, setAddress] = useState("")
    const [ zipcode, setZipcode] = useState("")
    const [ addressDetail, setAddressDetail] = useState("")

    // 모달 주소입력
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
      setIsOpen(true);
    };

    const handleOk = () => {
      setIsOpen(false);
    };

    const handleCancel = () => {
      setIsOpen(false);
    };
    const handleComplete = (data:any) =>{
      setIsOpen(false);
      setAddress(data.address)
      setZipcode(data.zonecode)
  }

  const onChangeAddressDetail = (event) => {
    setAddressDetail(event.target.value);
  };


    const onChangeContents = (value: any) =>{
        setValue("contents", value === "<p><br></p>" ? "" : value);
        trigger("contents");
    };

    // 이미지 등록하기
    const onChangeFileUrls = (fileUrl: string, index: number) => {
        const newFileUrls = [...fileUrls];
        newFileUrls[index] = fileUrl;
        setFileUrls(newFileUrls);
    };


    // 해시태그
    const [hashArr, setHashArr] = useState([]);
    const onKeyUpHash = (event) => {

    if (event.keyCode === 32 && event.target.value !== " ") {
      setHashArr([...hashArr, "#" + event.target.value]);
      event.target.value = "";
    }
  };

  // 등록하기
   const onClickSubmit = async(data:any) => {
    if(data.name && data.remarks && data.contents && data.price){
      
      try{    
    const result = await createUseditem({
      variables:{ 
        createUseditemInput:{
          name: data.name,
          remarks: data.remarks,
          contents: data.contents,
          price: Number(data.price),
          tags: hashArr,
          images: fileUrls,
          useditemAddress: {
              zipcode,
              address,
              addressDetail,
            },
        }
      }
    })  
     Modal.success({
                content: '상품 등록 성공!',
            }); 
    router.push(`/market/${result.data.createUseditem._id}`);

  }catch(error){
        if(error instanceof Error)
        Modal.error({
                content: error.message,
            });
    }
  }
 }

 // 수정하기
  const onClickUpdate = async(data) =>{
    // 이미지 수정
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(data?.fetchUseditem?.images);
    const isChangedFiles = currentFiles !== defaultFiles;
    if (
      !data.name &&
      !data.remarks &&
      !data.contents &&
      !data.price &&
      !isChangedFiles
    ){
      Modal.error({
        content: "수정한 내용이 없습니다.",
      });
    }

  const updateUseditemInput = {};
    if (data.name) updateUseditemInput.name = data.name;
    if (data.remarks) updateUseditemInput.remarks = data.remarks;
    if (data.contents) updateUseditemInput.contents = data.contents;
    if (data.price) updateUseditemInput.price = Number(data.price);
    if (isChangedFiles) updateUseditemInput.images = fileUrls;
    if (hashArr) updateUseditemInput.tags = hashArr;
    if (address) updateUseditemInput.useditemAddress.address = address; 
    if (zipcode) updateUseditemInput.useditemAddress.zipcode = zipcode; 


    try {
      await updateUseditem({
          variables: {
            useditemId: router.query.useditemId,
            updateUseditemInput,
          },
        });
        Modal.success({
            content: '게시물 수정이 완료되었습니다!',
        });
        router.push(`/market/${router.query.useditemId}`);
  } catch (error) {
          if (error instanceof Error)
            Modal.error({
              content: error.message,
          });
        }
    }

    //  이미지
  useEffect(() => {
    if (data?.fetchUseditem.images?.length) {
      setFileUrls([...data?.fetchUseditem.images]);
    }
    if (data?.fetchUseditem.tags?.length) {
      setHashArr([...data?.fetchUseditem.tags]);
    }
  }, [data]);

  const onClickCancel = () =>{
      router.back()
  }


    return(
        <MarketWriteUI
        data={data}
        isEdit={props.isEdit}
        ReactQuill={ReactQuill}
        onClickSubmit={onClickSubmit}
        onKeyUpHash={onKeyUpHash}
        hashArr={hashArr}
        onChangeFileUrls={onChangeFileUrls}
        fileUrls={fileUrls}
        onChangeContents={onChangeContents}
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        getValues={getValues}
        reset={reset}
        onClickCancel={onClickCancel}
        onClickUpdate={onClickUpdate}

        isOpen={isOpen}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleComplete={handleComplete}

        onChangeAddressDetail={onChangeAddressDetail}
        address={address}
        zipcode={zipcode}
        />
    )
}