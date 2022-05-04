// 마켓 상품 리스트 컨테이너

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getDate } from "../../commons/libraries/utils";
import { basket } from "../../commons/store";
import MarketListUI from "./list.presenter";
import { FETCH_USED_ITEMS } from "./list.queries";
import _ from "lodash";

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

const [basketItems, setBasketItems] = useRecoilState(basket);

const onClickToDetail = (el)=> (event) => {
    router.push(`/market/${event.currentTarget.id}`)


   const watch = JSON.parse(localStorage.getItem("watch") || "[]");

    const { __typename, ...newEl } = el;
    watch.unshift(newEl);

    localStorage.setItem("watch", JSON.stringify(watch));
    const ddd = _.uniqBy(watch, "_id");
    const ccc = ddd.slice(0, 3);
    console.log(ccc);
    setBasketItems(ccc);      
    }



    return(
        <MarketListUI
        data={data}
        onLoadMore={onLoadMore}
        onClickToDetail={onClickToDetail} 
        />
    )
}