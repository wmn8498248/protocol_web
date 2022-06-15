/**
 * 自定义tinymce配置
 * 20201225 徐杰
 */

//必须加载
export const silver = import('tinymce/themes/silver');
export const icons = import('tinymce/icons/default/icons');

//按需加载 组件plugins
export const image = import('tinymce/plugins/image');
export const media = import('tinymce/plugins/media'); // 插入视频插件
export const print = import('tinymce/plugins/print');
export const preview = import('tinymce/plugins/preview');
export const searchreplace = import('tinymce/plugins/searchreplace');
export const autolink = import('tinymce/plugins/autolink');
export const directionality = import('tinymce/plugins/directionality');
export const visualblocks = import('tinymce/plugins/visualblocks');
export const visualchars = import('tinymce/plugins/visualchars');
export const fullscreen = import('tinymce/plugins/fullscreen');
export const link = import('tinymce/plugins/link');
export const template = import('tinymce/plugins/template');
export const code = import('tinymce/plugins/code');
export const codesample = import('tinymce/plugins/codesample');
export const table = import('tinymce/plugins/table'); // 插入表格插件
export const hr = import('tinymce/plugins/hr');
export const pagebreak = import('tinymce/plugins/pagebreak');
export const nonbreaking = import('tinymce/plugins/nonbreaking');
export const anchor = import('tinymce/plugins/anchor');
export const insertdatetime = import('tinymce/plugins/insertdatetime');
export const advlist = import('tinymce/plugins/advlist');
export const lists = import('tinymce/plugins/lists'); // 列表插件
export const wordcount = import('tinymce/plugins/wordcount'); // 字数统计插件
export const imagetools = import('tinymce/plugins/imagetools');
export const textpattern = import('tinymce/plugins/textpattern');
// export const help = import('tinymce/plugins/help');//菜单帮助
export const emoticons = import('tinymce/plugins/emoticons');
export const autosave = import('tinymce/plugins/autosave');
export const autoresize = import('tinymce/plugins/autoresize');

//配置项
export const config = {
  language_url: '/tinymce/langs/zh_CN.js',
  language: 'zh_CN',
  skin_url: '/tinymce/skins/ui/oxide', //编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
  branding: false, // 是否禁用“Powered by TinyMCE”
  menubar: true, // 顶部菜单栏显示
  resize: true, //拉动高度
  plugins:
    'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table  hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern   autosave autoresize',
  toolbar:
    'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
  fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
  font_formats:
    '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;'
};
