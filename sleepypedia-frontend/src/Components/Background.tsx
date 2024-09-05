import backgroundImage from "../assets/background.svg";

const Background = () => {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-30`}
      style={{ backgroundImage: `url(${backgroundImage})` }}></div>
  );
};

export default Background;
