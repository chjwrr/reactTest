import './index.less'
export default function HomePage() {
  return (
    <div className='mainView'>
      <div className='contentView'></div>
    </div>
  );
}
export async function clientLoader() {
  const data = await fetch('/api/data');
  return [1,2,3];
}