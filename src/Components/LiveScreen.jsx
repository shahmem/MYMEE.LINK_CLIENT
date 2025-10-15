import PublicScreen from "./Common/PublicScreen";

function LiveScreen({ links, user, socialLinks, theme, position }) {

  return (
    <div
      style={{ fontFamily: theme.fontStyle }}
      className="flex-1 p-6 w-[45%] hidden  md:flex justify-center items-center md:pl-24 md:pr-12 md:pt-28"
    >
      <div
        className={` md:border-[12px] border-8 border-gray-800 w-[17rem] h-[34rem] rounded-[2rem]`}
      >
      <PublicScreen style={{ height: "100%" }} className="rounde-4xl" links={links} user={user} socialLinks={socialLinks} theme={theme} position={position} />
        
      </div>
    </div>
  );
}
 
export default LiveScreen;

