import MarketWrite from "../../../../src/componunts/write/write.container";

export default function MarketEditPage(props) {
  return <MarketWrite isEdit={true} data={props.data} />;
}