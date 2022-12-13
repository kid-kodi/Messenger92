import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingle, follow, unfollow } from "../core/api/user.api";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { API_URL } from "../core/api/auth-api";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let { profile } = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState();
  const [isUser, setIsUser] = useState(false);
  const [isFollower, setIsFollower] = useState(false);

  useEffect(() => {
    fetchSingle(id).then((response) => {
      if (!response.error) {
        setUser(response);
        setIsUser(response._id === id);
        setIsFollower(response._id !== id);
      }
    });
  }, [id]);

  const edit = () => {
    navigate("/edit");
  };

  const followUser = async () => {
    follow(profile._id).then((response) => {
      if (!response.error) {
        alert(`vous suivez ${profile.firstName + " " + profile.lastName}`);
      }
    });
  };

  const unfollowUser = async () => {
    unfollow(profile._id).then((response) => {
      if (!response.error) {
        alert(
          `vous ne suivez plus ${profile.firstName + " " + profile.lastName}`
        );
      }
    });
  };

  return (
    <Container>
      {user === undefined ? (
        <Spinner animation="border" />
      ) : (
        <Row className="p-5 border-bottom">
          <Col>
            <Stack direction="horizontal" gap={4}>
              <Image
                crossOrigin="anonymous"
                src={`${API_URL}/users/profile-picture/${profile?._id}`}
                roundedCircle
                width="60px"
              />
              <div>
                <h1>{profile.firstName + " " + profile.lastName}</h1>
                <p>{profile.email}</p>
              </div>
            </Stack>
          </Col>
          <Col md="auto">
            {isUser === true && (
              <Button variant="primary" onClick={edit}>
                Edit
              </Button>
            )}
            {isFollower === false && isUser === false && (
              <Button variant="primary" onClick={followUser}>
                Follow
              </Button>
            )}
            {isFollower === true && isUser === false && (
              <Button variant="primary" onClick={unfollowUser}>
                Unfollow
              </Button>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}
