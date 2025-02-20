"use client";

import {useFetchFunc} from "@/utils/useAxios";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

interface foodType {
	id: number;
	name: string;
	category: string;
	calories: number;
	price: number;
}

const Foods = () => {
	const [data, setData] = useState<foodType[]>([]);
	const router = useRouter();
	const axios = useFetchFunc();
	useEffect(() => {
		if (!localStorage.getItem(`token`)) {
			router.push(`/sign-in`);
		}

		axios({
			url: `/foods`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
			},
		})
			.then((data) => {
				setData(data.data);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<section className="w-[95%] mx-auto py-5 grid grid-cols-4 gap-4">
			{data
				? data?.map((food: foodType) => (
						<div
							className="w-full rounded-md border px-6 py-4 flex flex-col justify-between"
							key={food.id}>
							<strong className="text-2xl">Nomi: {food.name}</strong>
							<p className="text-base mt-3">
								<span className="text-xl">Categoriyasi: {food.category}</span>
							</p>
							<p className="text-base mt-2">
								<span className="text-xl">Caloriyasi: {food.calories}</span>
							</p>
							<p className="text-base mt-2">
								<span className="text-xl">Narxi: {food.price}</span>
							</p>
						</div>
				  ))
				: ""}
		</section>
	);
};

export default Foods;
