/* eslint-disable @next/next/no-img-element */
'use client'

import React, {useState} from 'react'
import { StarIcon, TruckIcon } from '@heroicons/react/20/solid';
import Button from '@/components/Button/Button';
import styles from './page.module.css'
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Page({ params }) {

    const [mainImage, setMainImage] = useState('/png/kurta.png');
    const thumbnailImages = [
        '/png/kurta.png',
        '/png/kurta2.png',
    ];

  return (
    <>
      
      
      <div className={styles.pageContainer}>
        <div className={styles.productCard}>
          {/* Left Section: Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImageWrapper}>
              <img src={mainImage} alt="Banarsi Tissue Suit" className={styles.mainImage} />
            </div>
            <div className={styles.thumbnailContainer}>
              {thumbnailImages.map((img, index) => (
                <div
                  key={index}
                  className={styles.thumbnail}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImage} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className={styles.productDetails}>
            <div>
              <h1 className={styles.productTitle}>Banarsi Tissue Suit</h1>
              <p className={styles.ratingText}>Starting from</p>
              <p className={styles.price}>$1,000</p>

              {/* Ratings */}
              <div className={styles.ratingsContainer}>
                <div className={styles.starIcons}>
                  4.5
                  <StarIcon className={styles.starIcon} />
                </div>
                <p className={styles.ratingText}>
                   10,559 ratings and 665 reviews
                </p>
              </div>

              <Button onClick={() => window.location.pathname += '/create_your_design'} styles={{borderRadius: '5px', marginBottom: '12px'}} fullLength>Design your suit</Button>

              {/* Delivery Info */}
              <div className={styles.deliveryInfo}>
                <TruckIcon className={styles.deliveryIcon} />
                Products are Tailored and Delivered in 3 weeks
              </div>

              {/* Product Detail */}
              <h2 className={styles.productDetailTitle}>PRODUCT DETAIL</h2>
              <ul className={styles.detailList}>
                <li>Color: Yellow, Material: Terivoil Cotton, Length: Knee Length, 45 Inches</li>
                <li>Style: Straight Side Slit, Neck: Round Neck, Sleeve: 3/4 Sleeve</li>
                <li>Chikankari Embroidery: Bakhiya & Phanda, Thread Color: White Color Thread</li>
                <li>Women&apos;s Apparel, Ethnic Wear Pair With: Palazzo, Trouser, Jeans & Pant</li>
                <li>Hand Embroidered Product, dealing with genuinely hand crafted products being washed multiple times rendering the product free from color bleeding and shrinkage.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.stepsContainer}>
          <div className={styles.stepTitle}>How to design your clothing</div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepCardTitle}>Choose the color and fabric</div>
              <div className={styles.ratingText} style={{marginLeft: '0'}}>New Fabrics every season. Choose from over 10 fabrics and patterns.</div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepCardTitle}>Choose the color and fabric</div>
              <div className={styles.ratingText} style={{marginLeft: '0'}}>New Fabrics every season. Choose from over 10 fabrics and patterns.</div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>03</div>
              <div className={styles.stepCardTitle}>Choose the color and fabric</div>
              <div className={styles.ratingText} style={{marginLeft: '0'}}>New Fabrics every season. Choose from over 10 fabrics and patterns.</div>
            </div>
          </div>
        </div>
        <div className={styles.reviewContainer}>
          <div className={styles.stepTitle}>Customer reviews and ratings</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', marginBottom: '18px'}}>
              <div className={styles.reviewSubTitle}>Average Rating Received <strong style={{fontSize: '24px', marginLeft: '12px'}}>4.5</strong></div>
              <div className={styles.starIcons} style={{backgroundColor: 'transparent', padding: '0'}}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={styles.starIcon} />
                ))}
              </div>
              
              |
              <div className={styles.reviewSubTitle}><strong style={{fontSize: '24px'}}>20</strong> Reviews Recieved</div>
          </div>

          <div className={styles.reviewSubTitle} style={{fontWeight: '800', fontSize: '22px', marginBottom: '22px'}}>Top Reviews</div>

          {
            [...Array(4)].map((_, i) => (
              <div className={styles.reviewCard} key={i}>
                <div className={styles.reviewCardTitle}>Perfect fit and Stunning Quality!!!</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className={styles.starIcons} style={{borderRadius: '4px'}}>
                    <StarIcon className={styles.starIcon} />
                    4.5
                  </div>
                  <div className={styles.reviewBy}>Khushi Gaur | 8 Jun 2023</div>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className={styles.reviewCardText}>I recently purchased a corset set from this shop, and I couldn&apos;t be more thrilled! The fit is absolutely perfect—hugging my curves in all the right places without feeling too tight or uncomfortable.I recently purchased a corset set from this shop, and I couldn&apos;t be more thrilled! The fit is absolutely perfect—hugging my curves in all the right places without feeling too tight or uncomfortable.I recently purchased a corset set from this shop, and I couldn&apos;t be more thrilled! The fit is absolutely perfect—hugging my curves in all the right places without feeling too tight or uncomfortable.I recently purchased a corset set from this</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <img src="/png/review1.png" alt="" className={styles.reviewImg} />
                    <img src="/png/review2.png" alt="" className={styles.reviewImg} />
                  </div>
                </div>
              </div>
            ))
          }

          <Button type='secondary'>View All Reviews</Button>
            
        </div>

        <div className={styles.reviewContainer}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px'}}>
            <div>
              <div className={styles.stepTitle} style={{marginBottom: '8px'}}>You might be interested in</div>
              <div>Celebrate the magic of the Holiday Season through exceptional</div>
            </div>
            <Button styles={{width: '50%'}} onClick={() => window.location.pathname += '/catelog'}>Explore More Designs!!!</Button>
          </div>
          
          <div className={styles.productWrapper}>
            <ProductCard title="Banarasi Suit" priceMax={200} priceMin={150} imgUrl="/png/product1.png" isPick />
            <ProductCard title="Banarasi Suit" priceMax={200} priceMin={150} imgUrl="/png/product2.png" />
            <ProductCard title="Banarasi Suit" priceMax={200} priceMin={150} imgUrl="/png/product3.png" />
          </div>
        </div>
    </>
  );
  }
  