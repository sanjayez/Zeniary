import Image from "next/image";

const GreenBlobSidekick = () => {
  return (
    <div className="relative">
      {/* <div className="absolute w-[700px] h-[400px] bg-green-400 top-96 left-[50%] -translate-x-1/2 -translate-y-1/2 blur-[350px]"></div> */}
      <Image src="/green-blob.svg" alt="green-blob" width={700} height={400} />
    </div>
  );
};

export default GreenBlobSidekick;
