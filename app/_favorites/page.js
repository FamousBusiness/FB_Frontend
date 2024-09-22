"use client";
// import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/utils/PrivateRoute'
// import { HeartOutlined } from '@ant-design/icons';
// import { Card, List } from 'antd';
// import Image from 'next/image';
import React from 'react'

function Page() {
// const {favItem, disfav}=useAuth();
//   const renderCategoryItem = ({ item }) => (
//     <div className={styles.categoryItem}>
//       <Image src={item.img} style={styles.categoryImage} />
//       <Text style={styles.categoryTitle}>{item.name}</Text>
//       <Text style={styles.categoryTitle}>Rs.{item.price}</Text>
//       <div className="absolute w-8 h-8 rounded-full justify-center mt-1 ml-1 bg-yellow-100">
//         <Icon
//           onClick={() => removeFromCart(item.id)}
//           name="close"
//           type="material"
//           size={24}
//           color="#333" // Customize the color as needed
//         />
//       </div>
//     </div>
//   );

//   const removeFromCart = (id) => {
//     disfav({ type: 'remove_from_favorite', id });
//   };

  return PrivateRoute(
    <div className=' p-10'>
      <h1 className=' my-2 text-xl font-semibold'>My Favorite</h1>
  
{/* {favItem.length>0?
  <List
    grid={{
      gutter: 16,
      column: 4,
    }}
    dataSource={favItem}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />:<div className=' min-w-min p-2 border border-1 rounded-lg flex flex-col items-center justify-center'>
    <Image src='/Favorite/empty-cart1.svg' alt='empty-cart' width={500} height={500}/>
    <h2>Add items to favorite</h2>
  </div>
} */}

    </div>
  )
}

export default Page;

