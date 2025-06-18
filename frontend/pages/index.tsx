import UploadForm from '../components/UploadForm'
import RegistryViewer from '../components/RegistryViewer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">ConditionalLayer Upload</h1>
      <UploadForm />
      <div className="mt-12">
        <RegistryViewer />
      </div>
    </main>
  )
}
