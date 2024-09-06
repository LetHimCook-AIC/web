export const parseCV = async (fileInput) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-apihub-key", process.env.NEXT_PUBLIC_API_KEY);
  myHeaders.append(
    "x-apihub-host",
    "HR-Resume-or-CV-File-Parser.allthingsdev.co"
  );
  myHeaders.append("x-apihub-endpoint", "82901f2c-a73d-4e06-87c2-db6d7b87b4b3");

  const formdata = new FormData();
  formdata.append("file", fileInput);
  formdata.append("language", "English");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_PARSER_BACKEND_URL,
      requestOptions
    );
    const result = await response.json();

    return result.job_id;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const suggestJobs = async (skills) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/job_rec`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skills),
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getInterviewQuestions = async (cv_data) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/interview_prep`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cv_data),
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
