import backgroundImage from "../assets/background-mountain.png";

const Background = () => {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-60`}
      style={{ backgroundImage: `url(${backgroundImage})` }}></div>
  );
};

export default Background;
