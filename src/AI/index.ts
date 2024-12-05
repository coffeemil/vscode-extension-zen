// request API
const api_key = "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";
const requestURL = "https://aigptx.top/v1/chat/completions";

export async function requestAutoMaticCodeWriting(
  question: string
): Promise<string> {
  const params = {
    messages: [
      {
        role: "system",
        content:
          "You are an automatic code writing program,Returns only the js code"
      },
      {
        role: "user",
        content: "Returns only the js code , return function"
      },
      {
        role: "user",
        content: "No special characters , no ```javascript and ```"
      },
      {
        role: "user",
        content: question
      }
    ],
    model: "gpt-4o-mini",
    temperature: 0.7, // random
    max_tokens: 4096 // max token
  };
  // API Register URL
  // >>>>>>  https://www.ohmygpt.com?aff=6obmWs0T
  // API documentation
  // >>>>>>  https://ohmygpt-docs.apifox.cn/
  // Thank you
  const res = await fetch(requestURL, {
    method: "post",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + api_key
    }
  });

  if (!res.ok) {
    throw new Error("Net Error");
  }
  const data: any = await res.json();
  const result = data["choices"][0]["message"]["content"];
  return result;
}

// 翻译成中文
export async function requestTranslateIntoCN(
  question: string
): Promise<string> {
  const params = {
    messages: [
      {
        role: "system",
        content:
          "You are a Chinese translation machine,but the user's original input must remain the same translation is based on the original input translation."
      },
      {
        role: "user",
        content:
          "Translate in each unit of action.adding the result to the each line."
      },
      {
        role: "user",
        content:
          "The original input Chinese do not need to be translated."
      },
      {
        role: "user",
        content: "No special characters , no ```javascript and ```"
      },
      {
        role: "user",
        content: question
      }
    ],
    model: "gpt-4o-mini",
    temperature: 0.7, // random
    max_tokens: 4096 // max token
  };
  // API Register URL
  // >>>>>>  https://www.ohmygpt.com?aff=6obmWs0T
  // API documentation
  // >>>>>>  https://ohmygpt-docs.apifox.cn/
  // Thank you
  const res = await fetch(requestURL, {
    method: "post",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + api_key
    }
  });

  if (!res.ok) {
    throw new Error("Net Error");
  }
  const data: any = await res.json();
  const result = data["choices"][0]["message"]["content"];
  return result;
}
