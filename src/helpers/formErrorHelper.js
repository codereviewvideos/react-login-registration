import _ from 'lodash';

const errorHelper = (errors, errorPath) => {

  let errorInfo;

  try {

    errorInfo = _.get(errors, errorPath, undefined);

    if (Array.isArray(errorInfo)) {
      errorInfo = formatErrors(errorInfo);
    }

  } catch (e) {

    // console.error('errorHelper e', e);

  }

  return errorInfo;

};



const formatErrors = (errors) => {

  let outputString = "";

  if (errors.length === 1) {
    outputString = errors[0];
  } else {

    outputString = errors
        .slice(0, -1)
        .join(', ') +
      ', and ' +
      errors.slice(-1)
    ;
  }

  return outputString;

};


export default errorHelper;
