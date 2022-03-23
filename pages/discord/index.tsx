import { Box, Fade, Modal, Button, Slider } from '@mui/material'
import { ReactElement, useState } from 'react'
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import Chat from '../../components/Discord/Chat'
import ServerBar from '../../components/Discord/ServerBar'
import Sidebar from '../../components/Discord/Sidebar'
import HomeHead from '../../components/HomeHead'
import DiscordLayout from '../../layouts/DiscordLayout'
import { generateDownload } from '../../components/Discord/Utils';

const CROP_AVATAR_AREA_ASPECT = 1 / 1;
const CROP_BANNER_AREA_ASPECT = 5 / 2;

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "40vw",
	minWidth: "200px",
	bgcolor: '#2f3136',
	boxShadow: 24,
	p: 4,
};

function getBase64(file: File, cb: (result: string | ArrayBuffer | null) => void) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		cb(reader.result);
	};
	reader.onerror = function (error) {
		console.log('Error: ', error);
	};
}


function downloadURI(uri: string, name: string) {
	let link: HTMLAnchorElement | null = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	link = null;
}

const CropperModal = ({ imageSrc, open, onClose, setCrop, setZoom, setCroppedArea, setCroppedPixels, setUrl, uId, crop, zoom, croppedArea, croppedAreaPixels, aspectRatio, title }: {
	imageSrc: string,
	open: boolean,
	onClose: () => void,
	setCrop: (area: Point) => void,
	setZoom: (zoom: number) => void,
	setCroppedArea: (area: Area) => void,
	setCroppedPixels: (area: Area) => void,
	setUrl: (url: string) => void,
	uId: string,
	crop: Point,
	zoom: number,
	croppedArea: Area,
	croppedAreaPixels: Area,
	aspectRatio: number,
	title: string,
}) => {
	return (
		<Modal
			keepMounted
			BackdropProps={{
				style: {
					backgroundColor: 'rgba(0,0,0,0.0)'
				}
			}}
			open={open}
			onClose={onClose}
			aria-labelledby="keep-mounted-modal-title"
			aria-describedby="keep-mounted-modal-description"
		>
			<Fade in={open}>
				<Box sx={style}>
					<div className="flex flex-col">
						<h1 className="font-bold text-[30px] mb-8">{title}</h1>
						<div className="relative h-[40vh]">
							<Cropper
								image={imageSrc}
								aspect={aspectRatio}
								crop={crop}
								zoom={zoom}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropAreaChange={(croppedArea, croppedAreaPixels) => {
									setCroppedArea(croppedArea);
									setCroppedPixels(croppedAreaPixels);
								}}
							/>
						</div>
						<div className="pointer-events-auto pt-4">
							<Slider
								value={zoom}
								onChange={(e: any) => { setZoom(e.target.value)  }}
								step={0.05}
								min={1}
								max={3}
							/>
						</div>
						<div className="flex flex-row justify-between p-2">
							<div className='w-[100%]'>
								<input
									type="file"
									accept="image/*"
									style={{ display: 'none' }}
									id={uId}
									onChange={(e) => {
										if (e.target.files && e.target.files.length > 0) {
											const file = e.target.files[0];
											getBase64(file, (result) => { setUrl(result as string) });
										}
									}}
								/>
								<label htmlFor={uId}>
									<Button
										variant="contained"
										size="small"
										className="w-[85%]"
										component="span"
										disableElevation
										sx={{ backgroundColor: '#36393f', color: '#fff', shadow: 'none' }}
									>
										Upload
									</Button>
								</label>
							</div>
							<Button
								variant="contained"
								size="small"
								className="w-[85%]"
								disableElevation
								sx={{ backgroundColor: '#36393f', color: '#fff' }}
								onClick={() => {
									generateDownload(imageSrc, croppedAreaPixels);
								}
								}
							>
								Export
							</Button>
						</div>
					</div>
				</Box>
			</Fade>
		</Modal>
	);
}

function DiscordHome() {
	// avatar
	const [openAvatar, setAvatarOpen] = useState(true);
	const handleAvatarOpen = () => setAvatarOpen(true);
	const handleAvatarClose = () => setAvatarOpen(false);
	const [cropAvatar, setAvatarCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoomAvatar, setAvatarZoom] = useState(1);
	const [croppedAvatarArea, setAvatarCroppedArea] = useState<Area>({ x: 0, y: 0, width: 0, height: 0 });
	const [croppedAvatarPixels, setAvatarCroppedPixels] = useState<Area>({ x: 0, y: 0, width: 0, height: 0 });
	const [urlAvatar, setUrlAvatar] = useState('/img/discord/avatar.webp');
	// banner
	const [openBanner, setBannerOpen] = useState(false);
	const handleBannerOpen = () => setBannerOpen(true);
	const handleBannerClose = () => setBannerOpen(false);
	const [cropBanner, setBannerCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoomBanner, setBannerZoom] = useState(1);
	const [croppedBannerArea, setBannerCroppedArea] = useState<Area>({ x: 0, y: 0, width: 0, height: 0 });
	const [croppedBannerPixels, setBannerCroppedPixels] = useState<Area>({ x: 0, y: 0, width: 0, height: 0 });
	const [urlBanner, setUrlBanner] = useState('/img/discord/banner.webp');

	const AvatarResult = {
		croppedArea: croppedAvatarArea,
		aspectRatio: CROP_AVATAR_AREA_ASPECT,
		imageSrc: urlAvatar,
		ModalCallback: (open: boolean) => setAvatarOpen(open),
	}
	const BannerResult = {
		croppedArea: croppedBannerArea,
		aspectRatio: CROP_BANNER_AREA_ASPECT,
		imageSrc: urlBanner,
		ModalCallback: (open: boolean) => setBannerOpen(open),
	}
	return (
		<>
			<HomeHead title="Discord Cropper | 3zachm.dev" description="Discord Cropper" path="discord" />
			<Sidebar
				AvatarResult={AvatarResult}
			/>
			<ServerBar
				AvatarResult={AvatarResult}
			/>
			<Chat
				AvatarResult={AvatarResult}
				BannerResult={BannerResult}
			/>
			<CropperModal
				imageSrc={urlAvatar}
				open={openAvatar}
				onClose={handleAvatarClose}
				setCrop={setAvatarCrop}
				setZoom={setAvatarZoom}
				setCroppedArea={setAvatarCroppedArea}
				setCroppedPixels={setAvatarCroppedPixels}
				setUrl={setUrlAvatar}
				uId="avatar-file-input"
				crop={cropAvatar}
				zoom={zoomAvatar}
				croppedArea={croppedAvatarArea}
				croppedAreaPixels={croppedAvatarPixels}
				aspectRatio={CROP_AVATAR_AREA_ASPECT}
				title="Avatar Crop"
			/>
			<CropperModal
				imageSrc={urlBanner}
				open={openBanner}
				onClose={handleBannerClose}
				setCrop={setBannerCrop}
				setZoom={setBannerZoom}
				setCroppedArea={setBannerCroppedArea}
				setCroppedPixels={setBannerCroppedPixels}
				setUrl={setUrlBanner}
				uId="banner-file-input"
				crop={cropBanner}
				zoom={zoomBanner}
				croppedArea={croppedBannerArea}
				croppedAreaPixels={croppedBannerPixels}
				aspectRatio={CROP_BANNER_AREA_ASPECT}
				title="Banner Crop"
			/>
		</>
	)
}

DiscordHome.getLayout = function getLayout(page: ReactElement) {
	return (
		<DiscordLayout>{page}</DiscordLayout>
	)
}

export default DiscordHome;
