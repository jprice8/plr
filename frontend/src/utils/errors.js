export const errorFieldToMessageMapping = {
  email: "Please enter a valid email.",
  password: "Please choose a password with at least 7 characters.",
};

export const parseErrorDetail = (errorDetail) => {
  let errorMessage = "Something went wrong. Contact support.";

  if (Array.isArray(errorDetail?.loc)) {
    // error with a path parameter and probabliy isn't a client issue
    if (errorDetail.loc[0] === "path") return errorMessage;
    // error with a query parameter and also is probably not the client's fault
    if (errorDetail.loc[0] === "query") return errorMessage;

    if (errorDetail.loc[0] === "body") {
      const invalidField = errorDetail.loc[2]

      if (errorFieldToMessageMapping[invalidField]) {
        errorMessage = errorFieldToMessageMapping[invalidField]
      } else if (errorDetail?.msg) {
        errorMessage = errorDetail.msg
      }
    }
    
  }

  return errorMessage;
};

export const extractErrorMessages = (error) => {
  const errorList = [];

  // if we just pass in a string, use that
  if (typeof error === "string") errorList.push(error);

  // backend error raised, pass up the message
  if (typeof error?.detail === "string") errorList.push(error.detail)

  // in the case that there's a validation error in the request body, path params,
  // or query params, we'll get an array of error issues here.
  if (Array.isArray(error?.detail)) {
    error.detail.forEach((errorDetail) => {
      const errorMessage = parseErrorDetail(errorDetail);
      errorList.push(errorMessage);
    });
  }

  return errorList;
};
