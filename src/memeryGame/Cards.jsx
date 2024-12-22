import { useState } from 'react'
const data = ["😑", "😒", "🤖", "🚀", "🫡"];
import { toast } from "react-hot-toast"
const showToast = () => {
    toast.success('🎉 You found a match! Great job!', {
        position: 'top-center', // Keeps the toast centered at the top
        style: {
            background: '#222', // Darker background for better contrast
            color: '#fff', // White text color
            fontSize: '20px', // Larger font size for better visibility
            padding: '20px 40px', // Increased padding for a more spacious feel
            borderRadius: '12px', // Larger border radius for smooth edges
            textAlign: 'center', // Centers the text
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Adds a subtle shadow for a 3D effect
        },
        icon: '🌟', // Adds an eye-catching icon
        duration: 4000, // Keeps the toast on screen for 4 seconds
    });
};
export default function Cards() {
    const [card, setCard] = useState(prepardCards);
    const [firstCardIndex, setFirstCardIndex] = useState(null)
    const [secondCardIndex, setSecondCardIndex] = useState(null)
    const [matchingCards, setMatchingCards] = useState([])
    function prepardCards() {
        const tempCard = [...data, ...data];
        for (let i = tempCard.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempCard[i], tempCard[j]] = [tempCard[j], tempCard[i]];
        }
        return tempCard
    }
    const handleCardClick = (index) => {
        return () => {
            if (firstCardIndex === null) {
                setFirstCardIndex(index)
            }
            else {
                const firstValue = card[firstCardIndex];
                const secondValue = card[index];
                if (firstValue === secondValue) {
                    setFirstCardIndex(null);
                    setMatchingCards((prev) => [...prev, firstCardIndex, index]);
                }
                else {
                    setSecondCardIndex(index);
                    setTimeout(() => {
                        setFirstCardIndex(null);
                        setSecondCardIndex(null);
                    }, 3000)
                }
            }
        }
    }
    return (
        <div className='gameContainer'>
            
            {
                card.map((card, idx) => {
                    return (
                        <div className='card'
                            key={idx}
                            data-active={matchingCards.includes(idx)}
                            data-disable={idx === firstCardIndex}
                            data-disable-all={firstCardIndex !== null && secondCardIndex !== null}
                            data-toggle={idx === firstCardIndex || idx === secondCardIndex}
                            onClick={handleCardClick(idx)}>
                            <div className='front'></div>
                            <div className='back'>{card}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
