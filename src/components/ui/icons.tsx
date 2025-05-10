type Props = {
  tokenPic1: string;
  tokenPic2: string;
  className?: string;
};
export const Icons = ({ tokenPic1, tokenPic2 }: Props) => {
  return (
    <div className="relative size-12 min-w-14">
      <div className="absolute top-0 left-0 rounded-full size-9 bg-muted border border-white overflow-hidden">
        <img src={tokenPic1} alt="" className="size-full object-cover" />
      </div>
      <div className="absolute bottom-0 right-0 rounded-full size-9 bg-muted border border-white overflow-hidden">
        <img src={tokenPic2} alt="" className="size-full object-cover" />
      </div>
      <div className="absolute top-1/2 left-1/5 rounded-full size-6 flex items-center justify-center bg-primary text-white text-xs border border-white">
        3
      </div>
    </div>
  );
};
