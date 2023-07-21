import Slider from "react-slick";

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider settings={settings}>
            {arrImages.map((image) => {
                return (
                    <image src={image} alt='slider'></image>
                )
            })}
        </Slider>
    )
}

export default SliderComponent