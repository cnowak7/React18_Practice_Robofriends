import React from "react";
import Card from "./Card";

const CardList = ({ robots }) => {
  const cardComponents = robots.map((robot, index) => {
    return (
      <Card
        key={index}
        id={robot.id}
        name={robot.name}
        email={robot.email}
      />
    );
  });

  return <>{cardComponents}</>;
};

export default CardList;
