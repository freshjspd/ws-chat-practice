import { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { getMessagesThunk } from './store/slices/messagesSlice';
import './App.css';
import { connect } from 'react-redux';
import { createMessageWs } from './api/ws';

function App({ messages, isFetching, error, limit, get }) {
  useEffect(() => {
    get(limit);
  }, [limit]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);

  const addMessage = (values, formikBag) => {
    // create(values); // http
    createMessageWs(values);
    formikBag.resetForm();
  };

  return (
    <>
      {error && <div style={{ color: 'red' }}>ERROR!!!</div>}
      {isFetching && <div>Messages is loading. Please, wait...</div>}
      {!isFetching && !error && (
        <ol>
          {messages.map(m => (
            <li key={m._id}>{JSON.stringify(m)}</li>
          ))}
        </ol>
      )}
      <hr />
      <Formik initialValues={{ body: '' }} onSubmit={addMessage}>
        {formikProps => (
          <Form>
            <Field name="body"></Field>
            <button type="submit">Send</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
