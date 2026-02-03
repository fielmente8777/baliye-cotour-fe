'use client'

import { useRef, useState, useEffect } from 'react';
import styles from './page.module.css';
import ExpandedFabricCard from '@/components/ExpandedFabricCard/ExpandedFabricCard';
import { FcCancel } from "react-icons/fc";
import Measurement from '@/components/Measurement/Measurement';
import Button from '@/components/Button/Button';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';

export default function Page() {

    const [sleeveType, setSleeveType] = useState('long');
    const [bodyType, setBodyType] = useState('long')
    const [colour, setColour] = useState('white');
    const [emb, setEmb] = useState(null);
    const [opt, setOpt] = useState(0);
    const canvasRef = useRef();
    const [expandedId, setExpandedId] = useState(null);
    
    const [isToggled, setIsToggled] = useState(false);


    const cards = [
  {
    id: 1,
    title: "Cotton 1",
    imgUrl: '/fabric/cotton.png',
  },
  {
    id: 2,
    title: "Cotton 2",
    imgUrl: '/fabric/cotton.png',
  },
 {
    id: 3,
    title: "Cotton 3",
    imgUrl: '/fabric/cotton.png',
  },
  {
    id: 4,
    title: "Cotton 4",
    imgUrl: '/fabric/cotton.png',
  },
];


    const expandedCard = cards.find((c) => c.id === expandedId);
    const collapsedCards = cards.filter((c) => c.id !== expandedId);

    const drawDesign = async () => {
        const ctx = canvasRef.current.getContext('2d');
        console.log("Loading:", `/kurti/${colour}/sleeve_${sleeveType}.png`);
console.log("Loading:", `/kurti/${colour}/body_${bodyType}.png`);
console.log("Loading:", `/kurti/embroidary/01.png`);

        const loadImage = (src) =>
            new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = '';
            img.onload = () => resolve(img);
            img.onerror = (e) => {
                console.error('Image load error', e, src);
                resolve(null); // optional fallback
            };
            img.src = src;
        });

        const imagesToLoad = [];

        // Always load body image
        imagesToLoad.push(loadImage(`/kurti/${colour}/body_${bodyType}.png`));

        // Conditionally load sleeve image
        if (sleeveType) {
            imagesToLoad.push(loadImage(`/kurti/${colour}/sleeve_${sleeveType}.png`));
        } else {
            imagesToLoad.push(Promise.resolve(null));
        }

        // Conditionally load embroidery image
        if (emb) {
            imagesToLoad.push(loadImage(`/embroidary/${emb}.png`));
        } else {
            imagesToLoad.push(Promise.resolve(null));
        }

        const [body, sleeves, embroidery] = await Promise.all(imagesToLoad);

        const offCanvas = document.createElement('canvas');
        offCanvas.width = 1200;
        offCanvas.height = 1700;
        const oCtx = offCanvas.getContext('2d');

         ctx.clearRect(0, 0, 1200, 1700);
        if (sleeveType) {
            ctx.drawImage(sleeves, 0, 0);
        }
        ctx.drawImage(body, 0, 0);

        if (sleeveType) {
            oCtx.drawImage(sleeves, 0, 0);
        }
        

        // Apply embroidery only where body is
        
        if (emb) {
            oCtx.drawImage(body, 0, 0);
            oCtx.save();
            oCtx.drawImage(body, 0, 0); // Mask
            oCtx.globalCompositeOperation = "source-in";

            oCtx.drawImage(embroidery, 0, 0);
            oCtx.restore();

            ctx.drawImage(offCanvas, 0, 0);
        }

        
        
    };



    useEffect(() => {
        console.log(typeof window);
        if (typeof window !== 'undefined') {
            drawDesign();
        }
    }, [sleeveType, bodyType, colour, emb, isToggled]);



    return (
        <div className={styles.page}>
            <div className={styles.canvas}>
                <div>
                    {opt === 3 && <div style={{position: 'absolute', top: '2%', right: '3%', zIndex: '10000'}}><ToggleSwitch isToggled={isToggled} setIsToggled={setIsToggled} /></div>}
                </div>
                <div className={styles.optionWrapper}>
                    <div className={styles.optionTitle}>Styling</div>
                    <div className={styles.optionContainer}>
                        <div className={styles.optionItem} onClick={() => setOpt(0)}>
                            <img onClick={() => setOpt(0)} src={`/fabric-${opt === 0 ? 'red' : 'grey'}.svg`} alt="" />
                            <div onClick={() => setOpt(0)} className={opt === 0 ? styles.optionItAc : styles.optionIt}>Fabric</div>
                        </div>
                        <div className={styles.optionItem} onClick={() => setOpt(1)}>
                            <img onClick={() => setOpt(1)} src={`/emb-${opt === 1 ? 'red' : 'grey'}.svg`} alt="" />
                            <div onClick={() => setOpt(1)} className={opt === 1 ? styles.optionItAc : styles.optionIt}>Embroidary</div>
                        </div>
                        <div className={styles.optionItem} onClick={() => setOpt(2)}>
                            <img onClick={() => setOpt(2)} src={`/opt-${opt === 2 ? 'red' : 'grey'}.svg`} alt="" />
                            <div onClick={() => setOpt(2)} className={opt === 2 ? styles.optionItAc : styles.optionIt}>Options</div>
                        </div>
                        <div className={styles.optionItem} onClick={() => setOpt(3)}>
                            <img onClick={() => setOpt(3)} src={`/opt-${opt === 3 ? 'red' : 'grey'}.svg`} alt="" />
                            <div onClick={() => setOpt(3)} className={opt === 3 ? styles.optionItAc : styles.optionIt}>Measurements</div>
                        </div>
                    </div>
                </div>
                {!isToggled && <canvas className={styles.img} ref={canvasRef} width={1200} height={1700} />}
                {isToggled && <img className={styles.img} style={{left: '40%', width: '60%'}} src="/png/model.png" />}

                {/* <div className={styles.finalWrapper}>
                    <div className={styles.itemNo}>1 Item in your cart</div>
                    <div className={styles.itemVal}>₹23,170</div>
                    <Button>Save and add to cart</Button>
                </div> */}
            </div>
            <div className={styles.selection}>
                {
                    opt === 0 && <>
                        <div className={styles.fabricTitle}>Fabric Style</div>
                        {expandedCard && <ExpandedFabricCard setExpandedId={setExpandedId} setColour={setColour} />}

                        <div className={styles.grid}>
                            {collapsedCards.map((card) => (
                            <div
                                key={card.id}
                                className={styles.card}
                                onClick={() => setExpandedId(card.id)}
                            >
                                <img src="/fabric/cotton.png" style={{width: '100%', height: '100%', marginBottom: '10px'}} />
                                <div>{card.title}</div>
                                <span className={styles.tooltip}>$8 - $10 per meter</span>
                            </div>
                            ))}
                        </div>
                    </>
                }
                {
                    opt === 1 && <>
                        <div className={styles.fabricTitle}>Embroidary</div>

                        <div className={styles.grid}>
                            <div
                                className={styles.card}
                                onClick={() => setEmb(null)}
                            >
                                <FcCancel size={200} />
                            </div>
                            <div
                                className={styles.card}
                                onClick={() => setEmb('01')}
                            >
                                <img src="/embroidary/01.png" style={{width: '100%', height: '100%', marginBottom: '10px'}} />
                                <div>01</div>
                            </div>
                        </div>
                    </>
                }
                {
                    opt === 2 && <>
                        <div className={styles.fabricTitle}>Styling</div>

                        <div style={{marginTop: '24px', fontWeight: 'bold'}}>Sleeves</div>

                        <div className={styles.grid}>
                            <Button onClick={() => setSleeveType(null)}>No Sleeve</Button>
                            <Button onClick={() => setSleeveType('short')}>Long Sleeve</Button>
                            <Button onClick={() => setSleeveType('long')}>Short Sleeve</Button>
                        </div>

                        <div style={{marginTop: '24px', fontWeight: 'bold'}}>Body</div>

                        <div className={styles.grid}>
                            <Button onClick={() => setBodyType('long')}>Long Body</Button>
                            <Button onClick={() => setBodyType('short')}>Short Body</Button>
                        </div>
                    </>
                }
                {
                    opt === 3 && <>
                        <div className={styles.fabricTitle}>My Measurement</div>

                        <Measurement />
                    </>
                }
            </div>
        </div>
    );
}