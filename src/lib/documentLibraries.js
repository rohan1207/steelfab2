/** Official document libraries (Google Drive). Do not mirror files into /public. */
export const DOCUMENT_LIBRARIES = [
  {
    type: 'Certificate',
    title: 'Certificates library',
    description: 'Company and compliance certificates — view online only.',
    url: 'https://drive.google.com/drive/folders/1KMVCiOqeg6Pv6BMMbEIxXNM8U3VvpfY7?usp=drive_link',
  },
  {
    type: 'Datasheet',
    title: 'Datasheet library',
    description: 'Technical datasheets for products and systems.',
    url: 'https://drive.google.com/drive/folders/1G4gPyJKvvCmTFOJsaZHxC_M0JbqD6Sq6?usp=drive_link',
  },
  {
    type: 'Policy',
    title: 'Policy library',
    description: 'Quality, HSE and company policy documents.',
    url: 'https://drive.google.com/drive/folders/1jE0VNhBljBq2SJ7oAusWH3CIpblUS2Gb?usp=drive_link',
  },
]

export const DOWNLOAD_FILTERS = ['All', 'Brochure', 'Datasheet', 'Catalog', 'Certificate', 'Policy']

export function isProtectedDocType(type) {
  return type === 'Certificate' || type === 'Policy'
}
