// From https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

export const isUrl = url => {
  var pattern = new RegExp(
    '^(https?://)?((([a-zd]([a-zd-]*[a-zd])*).)+[a-z]{2,}|((d{1,3}.){3}d{1,3}))(:d+)?(/[-a-zd%_.~+]*)*(?[;&a-zd%_.~+=-]*)?(#[-a-zd_]*)?$i'
  );

  return pattern.test(url);
};
