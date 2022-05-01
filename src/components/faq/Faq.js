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

      <span class="accordion__caption"><Fa.FaLightbulb/>How often are rewards paid out?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>Rewards are set to pay out hourly or once they hit the minimum payout level, whichever comes first.</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">

    <span class="accordion__caption"><Fa.FaLightbulb/>How do I claim my rewards?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>If you don't want to wait for the automatic payout, you can always click the "Claim Now" button on the dashboard. Otherwise, sit tight and let the rewards roll in.</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">

    <span class="accordion__caption"><Fa.FaLightbulb/>Do I pay taxes if I transfer Earn from one wallet to another?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">
    <span class="accordion__caption"><Fa.FaLightbulb/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irur</p>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__btn">
    <span class="accordion__caption"><Fa.FaLightbulb/>How do I figure out what to learn?</span>
      <span class="accordion__icon"><Fa.FaPlus/></span>
    </button>

    <div class="accordion__content">
      <p>Personally, I’d say choose a path and stick to it! Learning too many things at once will slow you down. Here are a few ideas of things you can choose to focus on, and a little bit about each one.</p>
    </div>
  </div>
</div>
        </div>
    </div>
  )
}

export default Faq