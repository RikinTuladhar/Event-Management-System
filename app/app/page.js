import Navbar from "@/components/Navbar";

export default function MyComponent() {
  return (
    <div className="w-full min-h-screen">
      <Navbar/>
      <h1 className="text-center">Welcome to My App</h1>
      <button className="btn btn-primary">Click Me</button>
    </div>
  );
}
