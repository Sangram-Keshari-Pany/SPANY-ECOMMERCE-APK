export function timeCalculation (flashshales:any,setSelectedFlashshale:any,setTimeLeft:any){
    if (flashshales && flashshales.length > 0) {
        const latestFlashshale: any = flashshales.reduce((latest, current) => {
          return new Date(current.end_time) > new Date(latest.end_time) ? current : latest;
        });
        setSelectedFlashshale(latestFlashshale);
  
        const endTime = new Date(latestFlashshale.end_time).getTime();
        const interval = setInterval(() => {
        const timeRemaining = endTime - Date.now();
          if (timeRemaining <= 0) {
            clearInterval(interval);
            setTimeLeft(0);
          } else {
            setTimeLeft(timeRemaining);
          }
        }, 1000);
        return () => clearInterval(interval);
    }
}

export const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return { hours: hours.toString().padStart(2, '0'), minutes: minutes.toString().padStart(2, '0'), seconds: seconds.toString().padStart(2, '0') };
  };

export function flashSaleProducts(selectedDiscount:any,flashshales:any){
    if (selectedDiscount === "All") {
        return flashshales.flatMap((flashshale: any) =>flashshale.product)
    };
      const percentage = parseInt(selectedDiscount.replace('%', ''));
      return flashshales
        .filter((flashshale: any) => flashshale.discount_percentage >= percentage)
        .flatMap((flashshale: any) =>flashshale.product
    );
}

export function generateUniqueId() {
  const now = new Date();
  const dateTimeString = now.getFullYear().toString() +
                         (now.getMonth() + 1).toString().padStart(2, '0') +
                         now.getDate().toString().padStart(2, '0') +
                         now.getHours().toString().padStart(2, '0') +
                         now.getMinutes().toString().padStart(2, '0') +
                         now.getSeconds().toString().padStart(2, '0');

  const randomNumbers = Math.floor(Math.random() * 100000); 

  const uniqueId = "SPANY"+dateTimeString + randomNumbers.toString().padStart(5, '0');
  
  return uniqueId;
}
