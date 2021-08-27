import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form, Button, Upload, Spin, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import _ from "lodash";
import toast from "react-hot-toast";
import queryString from "query-string";

import { uploadImages } from "../../api/uploads";
import * as actions from "../../store/books";
import * as categoriesActions from "../../store/categories";
import { Input } from "../../components";

const initialValues = {
  title: "",
  author: "",
  description: "",
  price: "",
  category: "",
  pdf: false,
};

const rules = {
  title: [
    {
      required: true,
      message: "Please enter book title.",
    },
  ],
  price: [
    {
      type: "number",
      required: true,
      min: 0,
      max: 100000,
      message: "Please enter book price. Greater than or equal to 0",
      default: 0,
    },
  ],
  category: [
    {
      required: true,
    },
  ],
};

function BookForm({
  loading,
  initialLoading,
  bookAdded,
  addBook,
  updateBook,
  loadBook,
  book,
  loadCategories,
  categories,
  categoriesLoading,
}) {
  const [form] = Form.useForm();
  const location = useLocation();
  const [rawImages, setRawImages] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [edit, setEdit] = useState(false);

  const onFinish = (values) => {
    const formData = { ...values, images: imagesList };
    if (!edit) {
      addBook(formData);
    } else {
      const query = queryString.parse(location.search);
      updateBook(query.id, formData);
    }
  };

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.edit === "true" && query.id) {
      setEdit(true);
      loadBook(query.id);
    } else {
      setEdit(false);
      form.resetFields();
      setImagesList([]);
    }
  }, [location.search]);

  useEffect(() => {
    if (bookAdded) {
      form.resetFields();
      setImagesList([]);
      setRawImages([]);
    }
  }, [bookAdded]);

  useEffect(() => {
    if (book && edit) {
      form.setFieldsValue(book);
      setImagesList(book.images);
    }
  }, [book]);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleImagesChange = (files) => {
    const images = files.fileList.map((file) => file.originFileObj);
    setRawImages(images);
  };

  const handleImageRemove = (image) => {
    const imagesUpdated = imagesList.filter((i) => i.name !== image.name);
    setImagesList(imagesUpdated);
  };

  const handleImagesUpload = async () => {
    setUploading(true);
    try {
      const { data } = await uploadImages(rawImages);
      setImagesList(data.data);
      setUploading(false);
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Error! Could no upload. Please try again later.";
      toast.error(errMsg);
      setUploading(false);
    }
  };

  if ((initialLoading && edit) || categoriesLoading) {
    return (
      <div className="text-center mt-header pt-4">
        <Spin />
      </div>
    );
  }

  return (
    <div className="containerC-sm mt-4">
      <p className="h3 mb-3">{edit ? "Update Book" : "Add Book"}</p>
      <Form initialValues={initialValues} onFinish={onFinish} form={form}>
        <Input name="title" placeholder="Book Title*" rules={rules.title} />

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <Input name="author" placeholder="Book Author" />
          </div>
          <div className="col-md-6 col-sm-12">
            <Input
              name="price"
              placeholder="Price"
              type="number"
              rules={rules.price}
            />
          </div>
        </div>
        <Input
          type="textarea"
          name="description"
          placeholder="Book Description"
        />

        <p className="lead fs-6">Category*</p>
        <Form.Item name="category" rules={rules.category}>
          <Select placeholder="Category" value={initialValues.category}>
            {categories.map((cat) => (
              <Select.Option value={cat._id}>{cat.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <p className="lead fs-6">Book Images*</p>
        <Upload
          customRequest={handleImagesUpload}
          onChange={handleImagesChange}
          onRemove={handleImageRemove}
          listType="picture-card"
          fileList={imagesList}
          multiple
          maxCount={8}
          accept=".png,.PNG,.jpg,JPG,jpeg,.JPEG"
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Pick Images</div>
            </div>
          )}
        </Upload>

        <Form.Item name="pdf" className="mt-4">
          <Select placeholder="Book Form" value={initialValues.pdf}>
            <Select.Option value={false}>Hard Copy</Select.Option>
            <Select.Option value={true}>Soft Copy</Select.Option>
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          shape="round"
          size="large"
          disabled={uploading}
          className="mt-4"
          loading={loading}
        >
          {edit ? "Update" : "Add Book"}
        </Button>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.books.loading,
    initialLoading: state.books.initialLoading,
    bookAdded: state.books.bookAdded,
    book: state.books.book,
    categories: state.categories.list,
    categoriesLoading: state.categories.initialLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (data) => dispatch(actions.addBook(data)),
    updateBook: (id, data) => dispatch(actions.updateBook(id, data)),
    loadBook: (id) => dispatch(actions.loadBook(id)),
    updateBook: (id, data) => dispatch(actions.updateBook(id, data)),
    loadCategories: (id) => dispatch(categoriesActions.loadCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
