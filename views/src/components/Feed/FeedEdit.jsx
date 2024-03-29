import React, { useState, useEffect, useCallback, Fragment } from 'react';

import Modal from '../Modal';
import Input from '../Form/Input/Input';
import FilePicker from '../Form/Input/FilePicker';
import { Backdrop } from '@mui/material';
import { required, length } from '../../util/validators';
import { generateBase64FromImage } from '../../util/image';

const POST_FORM = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: '',
    valid: false,
    touched: false,
    validators: [required],
  },
  content: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
};

const FeedEdit = (props) => {
  const [postForm, setPostForm] = useState(POST_FORM);
  const [formIsValid, setFormIsValid] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (
      props.editing &&
      props.selectedPost &&
      (postForm.title.value !== props.selectedPost.title ||
        postForm.image.value !== props.selectedPost.imagePath ||
        postForm.content.value !== props.selectedPost.content)
    ) {
      const updatedPostForm = {
        ...postForm,
        title: {
          ...postForm.title,
          value: props.selectedPost.title,
          valid: true,
        },
        image: {
          ...postForm.image,
          value: props.selectedPost.imagePath,
          valid: true,
        },
        content: {
          ...postForm.content,
          value: props.selectedPost.content,
          valid: true,
        },
      };
      setPostForm(updatedPostForm);
      setFormIsValid(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.editing, props.selectedPost]);

  const postInputChangeHandler = useCallback(
    (input, value, files) => {
      if (files) {
        generateBase64FromImage(files[0])
          .then((b64) => {
            setImagePreview(b64);
          })
          .catch((e) => {
            setImagePreview(null);
          });
      }
      let isValid = true;
      for (const validator of postForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...postForm,
        [input]: {
          ...postForm[input],
          valid: isValid,
          value: files ? files[0] : value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      setPostForm(updatedForm);
      setFormIsValid(formIsValid);
    },
    [postForm]
  );

  const inputBlurHandler = useCallback((input) => {
    setPostForm((prevState) => {
      return {
        ...prevState,
        [input]: {
          ...prevState[input],
          touched: true,
        },
      };
    });
  }, []);

  const cancelPostChangeHandler = useCallback(() => {
    setPostForm(POST_FORM);
    setFormIsValid(false);
    props.onCancelEdit();
  }, [props]);

  const acceptPostChangeHandler = useCallback(() => {
    const post = {
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value,
    };
    props.onFinishEdit(post);
    setPostForm(POST_FORM);
    setFormIsValid(false);
    setImagePreview(null);
  }, [postForm, props]);

  return props.editing ? (
    <Fragment>
      <Backdrop open={props.editing} onClick={cancelPostChangeHandler} />
      <Modal
        open={props.editing}
        title="New Post"
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={props.loading}
      >
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler('title')}
            valid={postForm['title'].valid}
            touched={postForm['title'].touched}
            value={postForm['title'].value}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler('image')}
            valid={postForm['image'].valid}
            touched={postForm['image'].touched}
          />
          <div>
            {!imagePreview && (
              <p style={{ textAlign: 'center' }}>Please choose an image.</p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt={postForm['title'].value}
                style={{ width: '200px' }}
              />
            )}
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler('content')}
            valid={postForm['content'].valid}
            touched={postForm['content'].touched}
            value={postForm['content'].value}
          />
        </form>
      </Modal>
    </Fragment>
  ) : null;
};

export default FeedEdit;