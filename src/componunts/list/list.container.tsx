// 마켓 상품 리스트 컨테이너

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import MarketListUI from "./list.presenter";
import { FETCH_USED_ITEMS } from "./list.queries";

export default function MarketList(){

    const router=useRouter()

    const {data, fetchMore, refetch} = useQuery(FETCH_USED_ITEMS)

        // 무한스크롤
    const onLoadMore = () => {
    if (!data) return;

    fetchMore({
    variables: { page: Math.ceil(data?.fetchUseditems.length / 10) + 1 },
    updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditems)
        return { fetchUseditems: [...prev.fetchUseditems] };
        return {
        fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
        ],
        };
    },
    });
};
    const onClickToDetail = (event) => {
        router.push(`/market/${event.currentTarget.id}`)
    }

    return(
        <MarketListUI
        data={data}
        onLoadMore={onLoadMore}
        onClickToDetail={onClickToDetail} 
        />
    )
}