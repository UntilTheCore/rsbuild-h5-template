import UnoCSS from '@unocss/postcss';
import postCss from "postcss-pxtorem"

export default {
  plugins: [
    UnoCSS(),
    postCss({
      rootValue: 37.5,
      propList: ['*'],
    })
  ],
};
