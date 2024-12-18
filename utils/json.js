export const json = (data, status = 200) => {
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      },
      status: status
    });
  };
  