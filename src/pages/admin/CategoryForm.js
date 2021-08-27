import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Spin, Upload } from "antd";
import queryString from "query-string";
import { connect } from "react-redux";
import toast from "react-hot-toast";
import _ from "lodash";

import * as actions from "../../store/categories";
import { uploadImages } from "../../api/uploads";
import { Input } from "../../components";

const initialValues = {
  title: "",
  image: "",
};

const rules = {
  title: [
    {
      required: true,
      message: "Please enter book title.",
    },
  ],
};

function CategoryForm({
  loading,
  initialLoading,
  addCategory,
  categoryAdded,
  loadCategory,
  updateCategory,
  category,
}) {
  const [form] = Form.useForm();
  const location = useLocation();
  const [edit, setEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rawImage, setRawImage] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.edit === "true" && query.id) {
      setEdit(true);
      loadCategory(query.id);
    } else {
      setEdit(false);
      form.resetFields();
      setImageList([]);
    }
  }, [location.search]);

  useEffect(() => {
    if (!loading && categoryAdded) {
      form.resetFields();
      setRawImage([]);
      setImageList([]);
    }
  }, [categoryAdded]);

  useEffect(() => {
    if (!loading && category) {
      form.setFieldsValue({ title: category?.title });
      setImageList([category?.image]);
    }
  }, [category]);

  const onFinish = (values) => {
    if (!edit) {
      addCategory({ title: values.title, image: imageList[0] });
    } else {
      const query = queryString.parse(location.search);
      updateCategory(query.id, { title: values.title, image: imageList[0] });
    }
  };

  const handleImageChange = ({ file }) => {
    setRawImage([file.originFileObj]);
  };

  const handleImageRemove = () => {
    setImageList([]);
  };

  const handleImageUpload = async () => {
    setUploading(true);
    try {
      const { data } = await uploadImages(rawImage);
      setImageList(data.data);
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Error! Could no upload. Please try again later.";
      toast.error(errMsg);
    }
    setUploading(false);
  };

  if (initialLoading && edit) {
    return (
      <div className="text-center mt-3">
        <Spin />
      </div>
    );
  }

  return (
    <div className="containerC-sm mt-4">
      <p className="h5 mb-3">{edit ? "Update Book" : "Add Category"}</p>
      <Form initialValues={initialValues} onFinish={onFinish} form={form}>
        <Input name="title" placeholder="Category Title*" rules={rules.title} />

        <Upload
          customRequest={handleImageUpload}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
          listType="picture-card"
          fileList={imageList}
          maxCount={1}
          accept=".png,.PNG,.jpg,JPG,jpeg,.JPEG"
        >
          {uploading ? (
            "Uploading..."
          ) : !imageList.length ? (
            <div>
              <div style={{ marginTop: 8 }}>Pick Image</div>
            </div>
          ) : null}
        </Upload>

        <Button
          type="primary"
          htmlType="submit"
          block
          shape="round"
          size="large"
          className="mt-1"
          disabled={uploading}
          loading={loading}
        >
          {edit ? "Update" : "Add Category"}
        </Button>
      </Form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.categories.loading,
    initialLoading: state.categories.initialLoading,
    categoryAdded: state.categories.categoryAdded,
    category: state.categories.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (data) => dispatch(actions.addCategory(data)),
    loadCategory: (id) => dispatch(actions.loadCategory(id)),
    updateCategory: (id, data) => dispatch(actions.updateCategory(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
