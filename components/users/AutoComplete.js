"use client";
import React, { useState, useEffect } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { usePathname } from 'next/navigation';



const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;




const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
const carouselWords = ['in Delhi', 'in Haryana', 'for Real Estate', 'for Website Agency'];

const AutoCom = ({ handleSubmit, search, handle }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const pathname = usePathname()



  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % carouselWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const onSearch = (value) => {
    if (value) {

      setLoading(true);
      handleSubmit(value);
      setLoading(false);
    } else {
      setWarning(true);
    }
  };

  useEffect(() => {

    if (pathname === search) {
      setLoading(false);
    }

  }, [search, pathname])

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  const handleChange = (value) => {
    const data = searchResult(value)
    if (value.length > 3) {
      setWarning(false);
    }
    else {
      setWarning(true);
    }
  }

  return (<>
    {/* <AutoComplete
      style={{
        width: '100%'
      }}
      options={options}


    > */}
    <Input.Search onFocus={() => handle()} onChange={handleChange} allowClear className=' w-full shadow-md' size='large' onSearch={onSearch} suffix={suffix}
      placeholder={`Search ${carouselWords[placeholderIndex]} `}
      enterButton  style={{ background: '#3c89d0', borderRadius:10 }} loading={loading} />

    {/* </AutoComplete> */}
  </>
  );
};
export default AutoCom;




// "use client"
// import React, { useState, useEffect } from 'react';
// import { AudioOutlined } from '@ant-design/icons';
// import { AutoComplete, Input } from 'antd';
// import Cookies from 'js-cookie';
// import { usePathname } from 'next/navigation';

// const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
// const carouselWords = ['in Delhi', 'in Haryana', 'for Real Estate', 'for Website Agency'];
// const AutoCom = ({ handleSubmit, search }) => {
//   const [loading, setLoading] = useState(false);
//   const [warning, setWarning] = useState(false);
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const [searchOptions, setSearchOptions] = useState([]);
//   const pathname = usePathname();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex((prevIndex) => (prevIndex + 1) % carouselWords.length);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // Fetch stored search data from cookies
//     const searchData = JSON.parse(Cookies.get('searchData')) || [];

//     // Map search data to options format for AutoComplete
//     const mappedOptions = searchData.map(item => ({
//       value: item.query,
//       label: item.query,
//     }));

//     setSearchOptions(mappedOptions);
//   }, []);

//   const onSearch = (value) => {
//     if (value) {
//       setLoading(true);
//       handleSubmit(value);
//       // Store search data in cookies
//       const searchData = Cookies.get('searchData') || [];
//       const updatedData = [...searchData, { query: value, timestamp: Date.now() }];
//       Cookies.set('searchData', updatedData, { expires: 1 }); // Expires in 1 day

//       setLoading(false);
//     } else {
//       setWarning(true);
//     }
//   };

//   useEffect(() => {
//     if (pathname === search) {
//       setLoading(false);
//     }
//   }, [search, pathname]);

//   const suffix = (
//     <AudioOutlined
//       style={{
//         fontSize: 16,
//         color: '#1677ff',
//       }}
//     />
//   );

//   const handleChange = (value) => {
//     if (value.length > 3) {
//       setWarning(false);
//     } else {
//       setWarning(true);
//     }
//   };

//   return (
//     <AutoComplete
//       style={{ width: '100%' }}
//       options={searchOptions}
//       onSelect={(value) => handleSubmit(value)}
//       onChange={handleChange}
//     >
//       <Input.Search
//         allowClear
//         className='w-full'
//         size='large'
//         onSearch={onSearch}
//         placeholder={`Search ${carouselWords[placeholderIndex]} `}
//         enterButton
//         loading={loading}
//       />
//     </AutoComplete>
//   );
// };

// export default AutoCom;
