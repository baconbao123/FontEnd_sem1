import React from 'react'

export default function AD_card_item({title,content,cardColor,Icon}) {
  return (
    <section className='d-inline-flex  mt-5 ms-5'>

<div class={`card-header ${cardColor} `}  >
 
  <div class="card-header-content">
    
    <h3 class="card-header-title"> <Icon/> {title}</h3>
    <h4 class="card-header-para">
    {content}
      </h4>
  </div>
</div>
    </section>
  )
}
