import React, {useEffect} from 'react';
import './faq.scss'
import * as Fa from 'react-icons/fa'





const Faq = () => {
    useEffect(()=>{
        // select all accordion items
        const accItems = document.querySelectorAll(".accordion__item");
        
        // add a click event for all items
        accItems.forEach((acc) => acc.addEventListener("click", toggleAcc));
        
        function toggleAcc() {
          // remove active class from all items exept the current item (this)
          accItems.forEach((item) => item != this ? item.classList.remove("accordion__item--active") : null
          );
        
          // toggle active class on current item
          if (this.classList != "accordion__item--active") {
            this.classList.toggle("accordion__item--active");
          }
        }
        },[])
  return (
    <div className='dash'>
                <div className="swap">Frequently Asked Questions</div>

        <div className='faq'>
        <div class="accordion">
  <h2 class="accordion__heading"></h2>

  <div class="accordion__item">
    <button class="accordion__btn">

      <span class="accordion__caption"><Fa.FaLightbulb/>Which Chain ?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>Binance Smart Chain (BSC)</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">

    <span class="accordion__caption"><Fa.FaLightbulb/>Was the presale whitelist or public?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>Whitelisted and it was filled organically within 10 seconds. No bots and No gas war.</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">

    <span class="accordion__caption"><Fa.FaLightbulb/>When launch?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>2 May. Confirmation news will be released soon.</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">
    <span class="accordion__caption"><Fa.FaLightbulb/>When listed on CEX?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>We will list on DEX first. CEX listing will be announced in Discord.</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">
    <span class="accordion__caption"><Fa.FaLightbulb/>Is there a Telegram community?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>No. All official news is communicated via Discord.</p>
    </div>
  </div>
</div>
        </div>
    </div>
  )
}

export default Faq