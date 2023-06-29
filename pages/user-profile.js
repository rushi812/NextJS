import React from "react";

export async function getServerSideProps(context) {
  return {
    props: { username: "Rushiraj" },
  };
}

const UserProfilePage = (props) => {
  return <div>{props.username}</div>;
};

export default UserProfilePage;
