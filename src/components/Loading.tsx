import { ClipLoader } from "react-spinners"

export default function Loading() {
  return (
    <div className="h-[400px] grid place-content-center">
      <ClipLoader size={100}  color="#7469B6" />
    </div>
  )
}
