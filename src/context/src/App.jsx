import ImageUploader from './components/ImageUploader';
import ImageList from './components/ImageList';
import './App.css';

function App() {
  return (
    <div className="container" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Local Image & Metadata Manager</h1>
      <ImageUploader />
      <ImageList />
    </div>
  );
}

export default App;