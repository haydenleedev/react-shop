import Stack from "react-bootstrap/Stack";

function Footer() {
  return (
    <footer className="bg-dark pt-5 mt-10  pb-5">
      <div className="container">
        <Stack direction="horizontal" gap={3}>
          <div className="text-white">Shoe Shop.inc</div>
          <div className="text-white m-auto">All copyrights are reserved.</div>
        </Stack>
      </div>
    </footer>
  );
}

export default Footer;
