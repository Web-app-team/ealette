import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FetchRestaurants: React.FC = () => {
  const [datas, setDatas] = useState([] as any[]);
  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    params: {
      latitude: '35.663908',
      longitude: '139.746178',
      limit: '20',
      currency: 'YEN',
      distance: '1',
      open_now: 'true',
      lunit: 'km',
      lang: 'ja_JP',
    },
    headers: {
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      'X-RapidAPI-Key':
        '405bb09151msh2508b0e503caff8p1e2e06jsn7359fd6fb65b',
    },
  };
  useEffect(() => {
    (async () => {
      axios
        .request(options)
        .then(async (response: any) => {
          setDatas(response.data.data);
          console.log(response.data.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    })();
  }, []);

  const d = datas.map((data: any, index: number) => {
    return data.cuisine;
  });
  const result = [
    ...datas
      .reduce((r, { cuisine }) => {
        (cuisine || []).forEach((o: any) => {
          r.has(o.name) || r.set(o.name, { ...o });
          r.get(o.name);
        });

        return r;
      }, new Map())
      .values(),
  ];

  // console.log(result);

  const itemList = result.map(({ name }) => name);

  console.log(itemList);

  // const d = datas.map((m) => {
  //   m.cuisine.forEach((p: any) => Object.assign(m, p));
  //   delete m.cuisine;
  // });

  // console.log(d);
  return (
    <View>
      <Text style={styles.paragraph2}>
        {' '}
        <ol>
          {datas.map((data: any, index: number) => (
            <li key={index}>
              <p>{data.name}</p>
            </li>
          ))}
        </ol>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  paragraph2: {
    flex: 4,
    overflow: 'visible',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FetchRestaurants;
