import { MediaKind, RtpCapabilities, RtpParameters } from 'mediasoup-client/lib/RtpParameters';
import { DtlsParameters } from 'mediasoup-client/lib/Transport';

export const defaultEdumeetConfig: EdumeetConfig = {
	loginEnabled: false,
	developmentPort: 3443,
	productionPort: 443,
	serverHostname: undefined,
	resolution: 'medium',
	frameRate: 30,
	screenResolution: 'veryhigh',
	screenSharingFrameRate: 5,
	simulcast: true,
	simulcastSharing: false,
	simulcastProfiles: {
		'320': [ {
			'scaleResolutionDownBy': 1,
			'maxBitRate': 150000
		} ],
		'640': [ {
			'scaleResolutionDownBy': 2,
			'maxBitRate': 150000
		}, {
			'scaleResolutionDownBy': 1,
			'maxBitRate': 500000
		} ],
		'1280': [ {
			'scaleResolutionDownBy': 4,
			'maxBitRate': 150000
		}, {
			'scaleResolutionDownBy': 2,
			'maxBitRate': 500000
		}, {
			'scaleResolutionDownBy': 1,
			'maxBitRate': 1200000
		} ],
		'1920': [ {
			'scaleResolutionDownBy': 6,
			'maxBitRate': 150000
		}, {
			'scaleResolutionDownBy': 3,
			'maxBitRate': 500000
		}, {
			'scaleResolutionDownBy': 1,
			'maxBitRate': 3500000
		} ],
		'3840': [ {
			'scaleResolutionDownBy': 12,
			'maxBitRate': 150000
		}, {
			'scaleResolutionDownBy': 6,
			'maxBitRate': 500000
		}, {
			'scaleResolutionDownBy': 1,
			'maxBitRate': 10000000
		} ]
	},
	localRecordingEnabled: false,
	requestTimeout: 20000,
	requestRetries: 3,
	autoGainControl: true,
	echoCancellation: true,
	noiseSuppression: true,
	voiceActivatedUnmute: false,
	noiseThreshold: -60,
	sampleRate: 48000,
	channelCount: 1,
	sampleSize: 16,
	opusStereo: false,
	opusDtx: true,
	opusFec: true,
	opusPtime: 20,
	opusMaxPlaybackRate: 48000,
	audioPreset: 'conference',
	audioPresets: {
		conference: {
			'name': 'Conference audio',
			'autoGainControl': true,
			'echoCancellation': true,
			'noiseSuppression': true,
			'voiceActivatedUnmute': false,
			'noiseThreshold': -60,
			'sampleRate': 48000,
			'channelCount': 1,
			'sampleSize': 16,
			'opusStereo': false,
			'opusDtx': true,
			'opusFec': true,
			'opusPtime': 20,
			'opusMaxPlaybackRate': 48000
		},
		hifi: {
			'name': 'HiFi streaming',
			'autoGainControl': false,
			'echoCancellation': false,
			'noiseSuppression': false,
			'voiceActivatedUnmute': false,
			'noiseThreshold': -60,
			'sampleRate': 48000,
			'channelCount': 2,
			'sampleSize': 16,
			'opusStereo': true,
			'opusDtx': false,
			'opusFec': true,
			'opusPtime': 60,
			'opusMaxPlaybackRate': 48000
		}
	},
	autoMuteThreshold: 4,
	background: 'images/background.jpg',
	defaultLayout: 'democratic',
	buttonControlBar: false,
	drawerOverlayed: true,
	notificationPosition: 'right',
	logo: 'images/logo.edumeet.svg',
	title: 'edumeet',
	supportUrl: 'https://support.example.com',
	privacyUrl: 'privacy/privacy.html',
};

export interface EdumeetConfig {
	loginEnabled: boolean;
	developmentPort: number;
	productionPort: number;
	serverHostname?: string;
	resolution: 'low' | 'medium' | 'high' | 'veryhigh' | 'ultra';
	frameRate: number;
	screenResolution: 'low' | 'medium' | 'high' | 'veryhigh' | 'ultra';
	screenSharingFrameRate: number;
	simulcast: boolean;
	simulcastSharing: boolean;
	simulcastProfiles: Record<string, SimulcastProfile[]>;
	localRecordingEnabled: boolean;
	requestTimeout: number;
	requestRetries: number;
	autoGainControl: boolean;
	echoCancellation: boolean;
	noiseSuppression: boolean;
	voiceActivatedUnmute: boolean;
	noiseThreshold: number;
	sampleRate: number;
	channelCount: number;
	sampleSize: number;
	opusStereo: boolean;
	opusDtx: boolean;
	opusFec: boolean;
	opusPtime: number;
	opusMaxPlaybackRate: number;
	audioPreset: string;
	audioPresets: Record<string, AudioPreset>;
	autoMuteThreshold: number;
	background: string;
	defaultLayout: 'democratic' | 'filmstrip';
	buttonControlBar: boolean;
	drawerOverlayed: boolean;
	notificationPosition: 'right' | 'left';
	logo: string;
	title: string;
	supportUrl: string;
	privacyUrl: string;
}

export interface SimulcastProfile {
	scaleResolutionDownBy: number;
	maxBitRate: number;
}

export interface AudioPreset {
	name: string;
	autoGainControl: boolean;
	echoCancellation: boolean;
	noiseSuppression: boolean;
	voiceActivatedUnmute: boolean;
	noiseThreshold: number;
	sampleRate: number;
	channelCount: number;
	sampleSize: number;
	opusStereo: boolean;
	opusDtx: boolean;
	opusFec: boolean;
	opusPtime: number;
	opusMaxPlaybackRate: number;
}

export interface SocketInboundNotification {
	method: string; // TODO: define inbound notification method strings
	data?: any; // TODO: define inbound notification data
}

export interface SocketOutboundRequest {
	method: string; // TODO: define outbound request method strings
	data?:
		CreateWebRtcTransport |
		ConnectWebRtcTransport |
		ProduceData |
		ConsumerData |
		JoinData;
}

export interface JoinData {
	displayName: string;
	picture: string;
	rtpCapabilities: RtpCapabilities;
	returning?: boolean;
}

export interface ConsumerData {
	consumerId: string;
}

export interface CreateWebRtcTransport {
	forceTcp: boolean;
	producing: boolean;
	consuming: boolean;
}

export interface ConnectWebRtcTransport {
	transportId: string;
	dtlsParameters: DtlsParameters;
}

export interface ProduceData {
	transportId: string;
	kind: MediaKind;
	rtpParameters: RtpParameters;
	appData?: any;
}