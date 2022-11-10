import { useState, useEffect } from "react";
const Linkpreview = (props) => {
  // const {link}=props;

  const [fetchedLinkData, setFetchedLinkData] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
  });

  useEffect(() => {
    var data = { key: "123456", q: "https://www.google.com" };
    const fetchLinkData = async () => {
      const response = await fetch("https://api.linkpreview.net", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      });

      const { title, description, image, url } = await response.json();

      setFetchedLinkData({ title, description, image, url });
      //return fetchedData;
    };
    fetchLinkData();
  });

  return (
    <section class="section">
      <div class="container">
        <div class="box">
          <img alt="link" src={fetchedLinkData.image} />
          <div class="is-clipped">
            <div id="mytitle" class="has-text-weight-bold">
              {fetchedLinkData.title}
            </div>
            <div id="mydescription" class="mt-2">
              {fetchedLinkData.description}
            </div>
            <div id="myurl" class="mt-2 is-size-7">
              {fetchedLinkData.url}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Linkpreview;
