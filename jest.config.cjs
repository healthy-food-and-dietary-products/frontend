// eslint-disable-next-line no-undef
module.exports = {
	preset: 'ts-jest',
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'^@images/(.*)$': '<rootDir>/$1', // for path aliases to work
		'^@scss/(.*)$': '<rootDir>/$1',
		'^@hooks/(.*)$': '<rootDir>/$1',
		'^@utils/(.*)$': '<rootDir>/$1',
		'^@components/(.*)$': '<rootDir>/$1',
		'^@components/ui/(.*)$': '<rootDir>/$1',
		'^@contexts/(.*)$': '<rootDir>/$1',
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		// process `*.tsx` files with `ts-jest`
	},
	rootDir: 'src',
	testEnvironment: 'jest-environment-jsdom',
};
