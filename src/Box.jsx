

export default function Box(props) {
    let track = props.track
    return (
        <div className="Box"
            ref={props.givenef}
            {...props}
            style={props.style}
        >
            <div className="box-img">
                <img src={track.album.images[0].url} className="box-img" alt="track cover" />
            </div>
            <div className="info">
                <div className="name">{track.name}</div>
                <div className="artist">{track.artists.map(el => el.name).join(" | ")}</div>
            </div>
        </div>
    )
}