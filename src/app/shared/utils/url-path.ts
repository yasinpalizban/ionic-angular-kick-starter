export function urlPath(url: string): string {
const t=  url.split('/');

  url=url.split('/').join(' ');
  if (url.search('add')){
    return t[t.length-1] =='add' ?'add':'';
  } else if (url.search('list') !== -1) {
    return 'list';
  } else if (url.search('detail') !== -1) {
    return 'detail';
  } else if (url.search('edit') !== -1) {
    return 'edit';
  }
  return '';
}
