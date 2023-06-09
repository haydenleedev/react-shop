import Card from "../components/card";
import { Button } from "react-bootstrap";

function Main(props) {
  return (
    <>
      <div className="main-bg"></div>
      <div className="container mt-5">
        <div className="row">
          {props.defaultData.map((item, index) => {
            return (
              <Card
                index={index}
                title={item.title}
                content={item.content}
                link={`/detail/${index}`}
                key={index}
                loading={props.loading}
              />
            );
          })}
        </div>
      </div>
      {!props.noMoreProducts ? (
        <div className="mt-4">
          <Button
            className="btn btn-danger bold"
            size="lg"
            onClick={props.loadMore}
          >
            Load more
          </Button>
        </div>
      ) : null}
    </>
  );
}
export default Main;
